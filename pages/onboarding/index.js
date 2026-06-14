import Head from "next/head";
import OnboardingFlow from "../../components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <>
      <Head>
        <title>Welcome | DJ Events</title>
        <meta
          name="description"
          content="Get started with DJ Events — discover and create unforgettable parties."
        />
      </Head>
      <OnboardingFlow />
    </>
  );
}
