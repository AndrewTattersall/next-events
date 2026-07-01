import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import styles from "../../styles/Onboarding.module.css";

const STEPS = [
  {
    id: "welcome",
    icon: null,
    badge: "Step 1",
    title: "Strength Training Fundamentals",
    subtitle:
      "Learn the squat setup with a guided anatomy overlay so you can lock in safe, repeatable form from day one.",
    showHero: true,
    heroImage: "/images/onboarding/hero-squat.jpg",
    heroTracks: [
      { label: "Alignment score", value: 96 },
      { label: "Muscle load", value: 91 },
      { label: "Knee path", value: 92 },
    ],
  },
  {
    id: "discover",
    icon: "🎧",
    badge: "Discover",
    title: "Browse events that match your vibe",
    subtitle: "Filter by genre, location, and date to find exactly what you're looking for.",
    stepImage: "/images/onboarding/step-discover.jpg",
    features: [
      {
        icon: "📍",
        title: "Events near you",
        description: "See what's happening in your city this weekend.",
        image: "/images/onboarding/feature-nearby.jpg",
      },
      {
        icon: "🎵",
        title: "Every genre",
        description: "From house and techno to hip-hop and drum & bass.",
        image: "/images/onboarding/feature-genres.jpg",
      },
      {
        icon: "⭐",
        title: "Curated picks",
        description: "Hand-picked highlights from the best venues and DJs.",
        image: "/images/onboarding/feature-curated.jpg",
      },
    ],
  },
  {
    id: "host",
    icon: "🎛️",
    badge: "Host",
    title: "Create and promote your events",
    subtitle: "Whether you're a DJ, promoter, or venue — get your event in front of the right crowd.",
    stepImage: "/images/onboarding/step-host.jpg",
    features: [
      {
        icon: "✏️",
        title: "Easy event creation",
        description: "Add details, set the vibe, and publish in minutes.",
        image: "/images/onboarding/feature-create.jpg",
      },
      {
        icon: "📣",
        title: "Reach your audience",
        description: "Share with fans who love your sound.",
        image: "/images/onboarding/feature-reach.jpg",
      },
      {
        icon: "📊",
        title: "Track interest",
        description: "See who's excited about your upcoming sets.",
        image: "/images/onboarding/feature-analytics.jpg",
      },
    ],
  },
  {
    id: "personalize",
    icon: "🎶",
    badge: "Personalize",
    title: "What gets you moving?",
    subtitle: "Pick your favorite genres so we can surface events you'll love.",
    stepImage: "/images/onboarding/step-personalize.jpg",
    genres: ["House", "Techno", "EDM", "Hip-Hop", "Drum & Bass", "Trance", "Disco", "Afrobeats"],
  },
  {
    id: "ready",
    icon: null,
    badge: "You're all set",
    title: "Let's hit the dance floor",
    subtitle: "Your personalized feed is ready. Time to explore the best parties in town.",
    stepImage: "/images/onboarding/step-ready.jpg",
    showConfetti: true,
  },
];

const HERO_MARKERS = [
  { id: "hip", top: "46%", left: "47%" },
  { id: "knee", top: "66%", left: "40%" },
  { id: "ankle", top: "84%", left: "45%" },
  { id: "shoulder", top: "28%", left: "52%" },
];

const STORAGE_KEY = "dj-events-onboarding-complete";

export function isOnboardingComplete() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function markOnboardingComplete() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, "true");
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const isLastStep = stepIndex === STEPS.length - 1;

  const finish = () => {
    markOnboardingComplete();
    if (selectedGenres.length > 0) {
      localStorage.setItem("dj-events-genres", JSON.stringify(selectedGenres));
    }
    router.push("/events");
  };

  const goNext = () => {
    if (isLastStep) {
      finish();
      return;
    }
    setStepIndex((i) => i + 1);
    setAnimKey((k) => k + 1);
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setAnimKey((k) => k + 1);
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <ThemeToggle />
        <button type="button" className={styles.skipLink} onClick={finish}>
          Skip
        </button>
      </div>

      <div className={`${styles.card} ${step.showHero ? styles.cardHeroStep : ""}`}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.stepDots}>
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={`${styles.dot} ${
                i === stepIndex ? styles.dotActive : i < stepIndex ? styles.dotComplete : ""
              }`}
            />
          ))}
        </div>

        <div
          key={animKey}
          className={`${styles.stepContent} ${step.showHero ? styles.stepContentHero : ""}`}
        >
          <div style={{ textAlign: "center" }}>
            <span className={styles.badge}>{step.badge}</span>
          </div>

          {step.showHero && (
            <div className={styles.hero}>
              <div className={styles.heroVisual}>
                <div className={styles.heroImageWrap}>
                  <Image
                    src={step.heroImage}
                    alt="Athlete performing a barbell squat with an anatomy scan overlay"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>

                <div className={styles.scanSweep} />

                {HERO_MARKERS.map((marker) => (
                  <span
                    key={marker.id}
                    className={styles.heroMarker}
                    style={{ top: marker.top, left: marker.left }}
                  />
                ))}

                <div className={styles.heroAnnotations}>
                  <span className={`${styles.heroTag} ${styles.heroTagTop}`}>Joint alignment scan</span>
                  <div className={styles.heroTagRow}>
                    <span className={`${styles.heroTag} ${styles.heroTagStart}`}>Muscle load</span>
                    <span className={`${styles.heroTag} ${styles.heroTagEnd}`}>Knee path</span>
                  </div>
                </div>
              </div>

              {step.heroTracks && (
                <ul className={styles.heroTracks}>
                  {step.heroTracks.map((track) => (
                    <li key={track.label} className={styles.heroTrackItem}>
                      <div className={styles.heroTrackTextRow}>
                        <span className={styles.heroTrackLabel}>{track.label}</span>
                        <span className={styles.heroTrackValue}>{track.value}%</span>
                      </div>
                      <span className={styles.heroTrackBar}>
                        <span className={styles.heroTrackFill} style={{ width: `${track.value}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step.showConfetti && (
            <div className={styles.confetti}>
              <span>🎉</span>
              <span>🪩</span>
              <span>🎊</span>
            </div>
          )}

          {step.icon && !step.stepImage && <div className={styles.iconWrap}>{step.icon}</div>}

          <h1 className={`${styles.title} ${step.showHero ? styles.heroTitle : ""}`}>{step.title}</h1>
          <p className={`${styles.subtitle} ${step.showHero ? styles.heroSubtitle : ""}`}>
            {step.subtitle}
          </p>

          {!step.showHero && step.stepImage && (
            <div className={styles.stepVisual}>
              <Image
                src={step.stepImage}
                alt={`${step.title} visual`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          {step.features && (
            <ul className={styles.featureList}>
              {step.features.map((feature) => (
                <li key={feature.title} className={styles.featureItem}>
                  <div className={styles.featureMedia}>
                    <Image
                      src={feature.image}
                      alt={`${feature.title} illustration`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.featureBody}>
                    <span className={styles.featureIcon}>{feature.icon}</span>
                    <div className={styles.featureText}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {step.genres && (
            <div className={styles.genreGrid}>
              {step.genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`${styles.genreChip} ${
                    selectedGenres.includes(genre) ? styles.genreChipSelected : ""
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.backBtn} ${stepIndex === 0 ? styles.backBtnHidden : ""}`}
            onClick={goBack}
          >
            Back
          </button>
          <button type="button" className={styles.nextBtn} onClick={goNext}>
            {isLastStep ? "Explore Events" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
