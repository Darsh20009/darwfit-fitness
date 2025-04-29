import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { SubscriptionData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint for new subscriptions
  app.post("/api/subscription", async (req, res) => {
    try {
      const subscriptionData: SubscriptionData = req.body;

      // Save to local file
      try {
        const submissionsPath = path.join(process.cwd(), "submissions.txt");

        // Check if file exists, if not create it
        try {
          await fs.access(submissionsPath);
        } catch {
          await fs.writeFile(submissionsPath, "");
        }

        // Get timestamp
        const timestamp = new Date().toLocaleString("ar-SA", {
          timeZone: "Asia/Riyadh",
        });

        // Format data for file storage
        const dataToWrite = `
=== استبيان جديد (${timestamp}) ===
الاسم: ${subscriptionData.name}
العمر: ${subscriptionData.age}
الجنس: ${subscriptionData.gender}
الوزن: ${subscriptionData.weight}
الطول: ${subscriptionData.height}
الهدف: ${subscriptionData.goal}
رقم الجوال: ${subscriptionData.phone}
تفاصيل الأكل اليومية:
فطور: ${subscriptionData.breakfast_details || '-'}
غداء: ${subscriptionData.lunch_details || '-'}
عشاء: ${subscriptionData.dinner_details || '-'}
تفاصيل التمرين:
نوع التمارين: ${Array.isArray(subscriptionData.exercise_type) ? subscriptionData.exercise_type.join(', ') : '-'}
عدد مرات التمرين: ${subscriptionData.exercise_times || '-'}
مدة التمرين: ${subscriptionData.exercise_duration || '-'}
----------------------------------
`;

        // Append data to file
        await fs.appendFile(submissionsPath, dataToWrite);
      } catch (fileError) {
        console.error("Error saving to file:", fileError);
        // Continue with email and WhatsApp even if file save fails
      }

      // Send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "app-email@gmail.com", // Would be set via env vars
          pass: process.env.EMAIL_PASS || "app-password",        // Would be set via env vars
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER || "app-email@gmail.com",
        to: "darwfit@outlook.com",
        subject: `استبيان اشتراك جديد من ${subscriptionData.name}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #10B981;">استبيان اشتراك جديد - Darwfit</h2>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>الاسم:</strong> ${subscriptionData.name}</p>
              <p><strong>العمر:</strong> ${subscriptionData.age}</p>
              <p><strong>الجنس:</strong> ${subscriptionData.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
              <p><strong>الوزن:</strong> ${subscriptionData.weight} كجم</p>
              <p><strong>الطول:</strong> ${subscriptionData.height} سم</p>
              <p><strong>الهدف:</strong> ${getGoalInArabic(subscriptionData.goal)}</p>
              <p><strong>رقم الجوال:</strong> ${subscriptionData.phone}</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="color: #3B82F6;">تفاصيل الأكل اليومية:</h3>
              <p>${subscriptionData.food_details}</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px;">
              <h3 style="color: #3B82F6;">تفاصيل التمرين:</h3>
              <p>${subscriptionData.exercise_details}</p>
            </div>
          </div>
        `,
      };

      // Try to send an email (in any environment)
      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to darwfit@outlook.com");
      } catch (emailError) {
        console.error("❌ Error sending email:", emailError);
        // Continue even if email fails
      }

      // Send WhatsApp message using official API
      const whatsappMessage = `🏋️‍♂️ *استبيان اشتراك جديد في داروفت* 🏋️‍♂️

الاسم: ${subscriptionData.name}
العمر: ${subscriptionData.age}
الجنس: ${subscriptionData.gender === 'male' ? 'ذكر' : 'أنثى'}
الوزن: ${subscriptionData.weight} كجم
الطول: ${subscriptionData.height} سم
رقم الجوال: ${subscriptionData.phone}
الهدف: ${getGoalInArabic(subscriptionData.goal)}

*تفاصيل الأكل اليومية:*
فطور: ${subscriptionData.breakfast_details || '-'}
غداء: ${subscriptionData.lunch_details || '-'}
عشاء: ${subscriptionData.dinner_details || '-'}

*تفاصيل التمرين:*
نوع التمارين: ${Array.isArray(subscriptionData.exercise_type) ? subscriptionData.exercise_type.join(', ') : '-'}
عدد مرات التمرين: ${subscriptionData.exercise_times || '-'}
مدة التمرين: ${subscriptionData.exercise_duration || '-'}

سعر الاشتراك: 100 ريال لمدة 3 شهور`;

      try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: subscriptionData.phone, // Use the phone number from the subscription data
            type: "text",
            text: { body: whatsappMessage }
          })
        });

        if (!response.ok) {
          throw new Error('WhatsApp API request failed');
        }

        console.log("✅ WhatsApp message sent successfully");
      } catch (whatsappError) {
        console.error("❌ Error sending WhatsApp message:", whatsappError);
        // Continue even if WhatsApp message fails
      }

      // Log submission info to console for verification
      console.log("📝 New subscription from:", subscriptionData.name);
      console.log("📧 Email to:", "darwfit@outlook.com");
      console.log("📱 WhatsApp to:", subscriptionData.phone);

      res.status(200).json({ success: true, message: "تم إرسال الاستبيان بنجاح وتخزينه. سيتم التواصل معك قريباً" });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ success: false, message: "حدث خطأ أثناء معالجة الاستبيان" });
    }
  });

  // Authentication endpoint
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "محمد السهلي" && password === "123456") {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getGoalInArabic(goal: string): string {
  const goalMap: Record<string, string> = {
    lose_weight: "خسارة الوزن",
    gain_muscle: "بناء العضلات",
    maintain: "المحافظة على الوزن الحالي",
    improve_fitness: "تحسين اللياقة البدنية"
  };

  return goalMap[goal] || goal;
}