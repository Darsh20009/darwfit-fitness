import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CLIENT_PROFILES, ClientProfile } from "../data/clientProfiles";
import { Users, Plus, Edit, Trash2, Search } from "lucide-react";

export default function AdminPage() {
  const [clients, setClients] = useState<ClientProfile[]>(CLIENT_PROFILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);

  const [newClient, setNewClient] = useState<Partial<ClientProfile>>({
    name: "",
    username: "",
    password: "",
    subscriptionId: "",
    workoutPlanId: "beginner_plan",
    mealPlanId: "weight_loss_plan",
    personalInfo: {
      age: 0,
      gender: 'male',
      weight: 0,
      height: 0,
      goal: '',
      activityLevel: 'moderate'
    }
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.subscriptionId.includes(searchTerm)
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.username || !newClient.password) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const clientId = `client_${Date.now()}`;
    const subscriptionId = `50${clients.length + 10}`;
    
    const fullClient: ClientProfile = {
      id: clientId,
      name: newClient.name!,
      username: newClient.username!,
      password: newClient.password!,
      subscriptionId: subscriptionId,
      subscriptionEndDate: "",
      workoutPlanId: newClient.workoutPlanId!,
      mealPlanId: newClient.mealPlanId!,
      personalInfo: newClient.personalInfo || {}
    };

    setClients([...clients, fullClient]);
    setNewClient({
      name: "",
      username: "",
      password: "",
      subscriptionId: "",
      workoutPlanId: "beginner_plan",
      mealPlanId: "weight_loss_plan",
      personalInfo: {}
    });
    setShowAddForm(false);
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const workoutPlanNames = {
    "beginner_plan": "خطة المبتدئين",
    "muscle_building_plan": "خطة بناء العضلات",
    "women_fitness_plan": "خطة اللياقة للنساء"
  };

  const mealPlanNames = {
    "weight_loss_plan": "خطة إنقاص الوزن",
    "muscle_gain_plan": "خطة زيادة العضلات",
    "healthy_lifestyle_plan": "خطة نمط حياة صحي",
    "vegetarian_plan": "خطة نباتية"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          إدارة العملاء
        </h1>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة عميل جديد
        </Button>
      </div>

      {/* شريط البحث */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث بالاسم أو رقم الاشتراك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* نموذج إضافة عميل جديد */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>إضافة عميل جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>الاسم الكامل</Label>
                <Input
                  value={newClient.name || ""}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              
              <div>
                <Label>اسم المستخدم</Label>
                <Input
                  value={newClient.username || ""}
                  onChange={(e) => setNewClient({...newClient, username: e.target.value})}
                  placeholder="اسم المستخدم للدخول"
                />
              </div>
              
              <div>
                <Label>كلمة المرور</Label>
                <Input
                  type="password"
                  value={newClient.password || ""}
                  onChange={(e) => setNewClient({...newClient, password: e.target.value})}
                  placeholder="كلمة المرور"
                />
              </div>

              <div>
                <Label>خطة التمارين</Label>
                <Select
                  value={newClient.workoutPlanId}
                  onValueChange={(value) => setNewClient({...newClient, workoutPlanId: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner_plan">خطة المبتدئين</SelectItem>
                    <SelectItem value="muscle_building_plan">خطة بناء العضلات</SelectItem>
                    <SelectItem value="women_fitness_plan">خطة اللياقة للنساء</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>خطة الوجبات</Label>
                <Select
                  value={newClient.mealPlanId}
                  onValueChange={(value) => setNewClient({...newClient, mealPlanId: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss_plan">خطة إنقاص الوزن</SelectItem>
                    <SelectItem value="muscle_gain_plan">خطة زيادة العضلات</SelectItem>
                    <SelectItem value="healthy_lifestyle_plan">خطة نمط حياة صحي</SelectItem>
                    <SelectItem value="vegetarian_plan">خطة نباتية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddClient}>
                إضافة العميل
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* قائمة العملاء */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    اسم المستخدم: {client.username}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingClient(client)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    رقم الاشتراك: {client.subscriptionId}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium">خطة التمارين:</p>
                  <p className="text-sm text-muted-foreground">
                    {workoutPlanNames[client.workoutPlanId as keyof typeof workoutPlanNames]}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">خطة الوجبات:</p>
                  <p className="text-sm text-muted-foreground">
                    {mealPlanNames[client.mealPlanId as keyof typeof mealPlanNames]}
                  </p>
                </div>

                {client.personalInfo.age && (
                  <div className="text-sm">
                    <span className="font-medium">العمر:</span> {client.personalInfo.age} سنة
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لا توجد عملاء مطابقة لبحثك</p>
        </div>
      )}
    </div>
  );
}