import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { isOnboardingComplete } from "../components/onboarding/OnboardingFlow";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <Layout>
      <h1>Home content</h1>
    </Layout>
  );
}
