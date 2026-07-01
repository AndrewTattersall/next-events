import { useState } from "react";
import { useRouter } from "next/router";
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
    heroTracks: [
      { label: "Joint alignment scan", value: 96 },
      { label: "Muscle loading", value: 91 },
      { label: "Knee tracking", value: 92 },
    ],
  },
  {
    id: "discover",
    icon: "🎧",
    badge: "Discover",
    title: "Browse events that match your vibe",
    subtitle: "Filter by genre, location, and date to find exactly what you're looking for.",
    features: [
      {
        icon: "📍",
        title: "Events near you",
        description: "See what's happening in your city this weekend.",
      },
      {
        icon: "🎵",
        title: "Every genre",
        description: "From house and techno to hip-hop and drum & bass.",
      },
      {
        icon: "⭐",
        title: "Curated picks",
        description: "Hand-picked highlights from the best venues and DJs.",
      },
    ],
  },
  {
    id: "host",
    icon: "🎛️",
    badge: "Host",
    title: "Create and promote your events",
    subtitle: "Whether you're a DJ, promoter, or venue — get your event in front of the right crowd.",
    features: [
      {
        icon: "✏️",
        title: "Easy event creation",
        description: "Add details, set the vibe, and publish in minutes.",
      },
      {
        icon: "📣",
        title: "Reach your audience",
        description: "Share with fans who love your sound.",
      },
      {
        icon: "📊",
        title: "Track interest",
        description: "See who's excited about your upcoming sets.",
      },
    ],
  },
  {
    id: "personalize",
    icon: "🎶",
    badge: "Personalize",
    title: "What gets you moving?",
    subtitle: "Pick your favorite genres so we can surface events you'll love.",
    genres: ["House", "Techno", "EDM", "Hip-Hop", "Drum & Bass", "Trance", "Disco", "Afrobeats"],
  },
  {
    id: "ready",
    icon: null,
    badge: "You're all set",
    title: "Let's hit the dance floor",
    subtitle: "Your personalized feed is ready. Time to explore the best parties in town.",
    showConfetti: true,
  },
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

      <div className={styles.card}>
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

        <div key={animKey} className={styles.stepContent}>
          <div style={{ textAlign: "center" }}>
            <span className={styles.badge}>{step.badge}</span>
          </div>

          {step.showHero && (
            <div className={styles.hero}>
              <div className={styles.heroVisual}>
                <svg
                  className={styles.heroSvg}
                  viewBox="0 0 360 220"
                  role="img"
                  aria-label="Animated squat posture anatomy scan"
                >
                  <g className={styles.heroBody}>
                    <circle className={styles.heroHead} cx="192" cy="44" r="16" />
                    <path className={styles.heroBone} d="M192 60 L192 108" />
                    <path className={styles.heroBone} d="M192 82 L146 104 L110 126" />
                    <path className={styles.heroBone} d="M192 84 L226 96 L252 108" />
                    <path className={styles.heroBone} d="M192 108 L160 138 L132 172" />
                    <path className={styles.heroBone} d="M192 108 L228 130 L260 160" />
                  </g>

                  <g className={styles.heroMuscles}>
                    <ellipse className={styles.heroMuscleCore} cx="192" cy="88" rx="18" ry="24" />
                    <ellipse className={styles.heroMuscleQuad} cx="168" cy="132" rx="12" ry="18" />
                    <ellipse className={styles.heroMuscleGlute} cx="205" cy="126" rx="14" ry="16" />
                    <ellipse className={styles.heroMuscleCalf} cx="143" cy="166" rx="10" ry="14" />
                  </g>

                  <g className={styles.heroJoints}>
                    <circle cx="192" cy="82" r="4.5" />
                    <circle cx="192" cy="108" r="4.5" />
                    <circle cx="160" cy="138" r="4.5" />
                    <circle cx="132" cy="172" r="4.5" />
                    <circle cx="228" cy="130" r="4.5" />
                  </g>
                </svg>

                <div className={styles.scanSweep} />
                <span className={`${styles.heroTag} ${styles.heroTagTop}`}>Joint alignment scan</span>
                <span className={`${styles.heroTag} ${styles.heroTagLeft}`}>Muscle loading</span>
                <span className={`${styles.heroTag} ${styles.heroTagRight}`}>Knee tracking</span>
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

          {step.icon && <div className={styles.iconWrap}>{step.icon}</div>}

          <h1 className={styles.title}>{step.title}</h1>
          <p className={styles.subtitle}>{step.subtitle}</p>

          {step.features && (
            <ul className={styles.featureList}>
              {step.features.map((feature) => (
                <li key={feature.title} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <div className={styles.featureText}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
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
