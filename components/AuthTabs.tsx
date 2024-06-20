import LoginForm from '@/app/auth/_components/LoginForm';
import SignUpForm from '@/app/auth/_components/SignUpForm';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full max-w-lg mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-3">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
