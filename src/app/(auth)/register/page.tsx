import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/layouts/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}