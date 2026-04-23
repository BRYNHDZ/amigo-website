import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  MapPin,
  Compass,
  MessageCircle,
  Heart,
  UserPlus,
  RefreshCw,
  Scissors,
  Leaf,
  Package,
  Sprout,
  Award,
  User,
  Flower2,
  Zap,
  Sparkles,
  Calendar,
  CheckCircle,
  Brush,
  Wind,
  Crown,
  ShieldCheck,
  Users2,
  ThumbsUp,
  Edit2,
  Send,
  Loader2,
  Snowflake,
  Truck,
  UserCheck,
  Star,
  Hand,
  Feather,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SelectionKey =
  | "propertyCity"
  | "status"
  | "wants_mowing"
  | "clippings"
  | "lawnHealth"
  | "beds"
  | "refresh"
  | "mulch"
  | "bushes"
  | "leaves"
  | "snow"
  | "handsOff";

interface Selections {
  propertyCity: string | null;
  status: string | null;
  wants_mowing: string | null;
  clippings: string | null;
  lawnHealth: string | null;
  beds: string | null;
  refresh: string | null;
  mulch: string | null;
  bushes: string | null;
  leaves: string | null;
  snow: string | null;
  handsOff: string | null;
}

interface ScorePoints {
  clippings: number;
  lawnHealth: number;
  beds: number;
  refresh: number;
  mulch: number;
  bushes: number;
  leaves: number;
  snow: number;
}

const PlanQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 13;

  const [selections, setSelections] = useState<Selections>({
    propertyCity: null,
    status: null,
    // Mowing is mandatory for now — hardcoded Yes. May revisit later.
    wants_mowing: "Yes",
    clippings: null,
    lawnHealth: null,
    beds: null,
    refresh: null,
    mulch: null,
    bushes: null,
    leaves: null,
    snow: null,
    handsOff: null,
  });

  const [scorePoints, setScorePoints] = useState<ScorePoints>({
    clippings: 0,
    lawnHealth: 0,
    beds: 0,
    refresh: 0,
    mulch: 0,
    bushes: 0,
    leaves: 0,
    snow: 0,
  });

  const [perennialPruning, setPerennialPruning] = useState(false);
  const [wantsSalt, setWantsSalt] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);

  const selectOption = (category: SelectionKey, value: string, points: number = 0) => {
    setSelections((prev) => ({
      ...prev,
      [category]: value,
    }));

    if (category in scorePoints) {
      setScorePoints((prev) => ({
        ...prev,
        [category]: points,
      }));
    }
  };

  const calculateProfile = () => {
    const total = Object.values(scorePoints).reduce((a, b) => a + b, 0);
    // Scoring logic preserved — only labels + copy updated
    if (total >= 80) {
      return {
        label: "Fully Handled",
        icon: ShieldCheck,
        text: "You want every detail taken care of — no thinking, no follow-ups, nothing falling through the cracks. We are a great fit!",
      };
    } else if (total >= 45) {
      return {
        label: "Clean & Consistent",
        icon: Crown,
        text: "You want your property looking sharp and well-kept through the whole season, with a premium touch on the things that matter most. We are a great fit!",
      };
    } else if (total >= 15) {
      return {
        label: "Balanced Care",
        icon: Users2,
        text: "You handle a few things yourself, but you rely on us for the heavy lifting and seasonal work. A practical mix that keeps your property looking great. We are a great fit!",
      };
    } else {
      return {
        label: "Hands-On Support",
        icon: UserCheck,
        text: "You take pride in doing most of the work yourself and just want targeted professional support where it counts. We are a great fit!",
      };
    }
  };

  // Step order (mowing + leaf care are mandatory; bed care is split into weeding + mulch):
  // 1 Welcome, 2 Location, 3 Relationship, 4 Mowing finish, 5 Leaf care (mandatory),
  // 6 Flower Bed Care — weeding, 7 Flower Bed Care — mulch, 8 Hands-off preference,
  // 9 Lawn Improvement, 10 Spring cleanup, 11 Trimming/Pruning, 12 Snow, 13 Summary
  const stepValidation: Record<number, SelectionKey> = {
    2: "propertyCity",
    3: "status",
    4: "clippings",
    5: "leaves",
    6: "beds",
    7: "mulch",
    8: "handsOff",
    9: "lawnHealth",
    10: "refresh",
    11: "bushes",
    12: "snow",
  };

  const nextStep = () => {
    const requiredCategory = stepValidation[currentStep];
    if (requiredCategory && !selections[requiredCategory]) {
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const editPlan = () => {
    setCurrentStep(2);
  };

  useEffect(() => {
    if (currentStep === 13) {
      // Scroll to the top of the plan section (not the page), so the user
      // sees their profile result without being yanked away from the quiz.
      document
        .getElementById("plan")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    const formElement = e.currentTarget;
    const honeypot = formElement.querySelector<HTMLInputElement>('input[name="bot-field"]');
    if (honeypot && honeypot.value) {
      navigate("/request-confirmation");
      return;
    }

    // Client-side rate limiting (shared key with v1 — same user, same limit)
    const RATE_LIMIT_KEY = "plan_submissions";
    const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
    const MAX_SUBMISSIONS = 3;

    try {
      const storedData = localStorage.getItem(RATE_LIMIT_KEY);
      const submissions: number[] = storedData ? JSON.parse(storedData) : [];
      const now = Date.now();
      const recentSubmissions = submissions.filter(
        (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW,
      );
      if (recentSubmissions.length >= MAX_SUBMISSIONS) {
        alert("You've submitted too many requests recently. Please try again in an hour.");
        return;
      }
      recentSubmissions.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
    } catch (err) {
      console.warn("Rate limiting check failed:", err);
    }

    if (!selections.propertyCity || !selections.status || !formData.name || !formData.email) {
      alert("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    const profile = calculateProfile();

    const formPayload = new URLSearchParams({
      "form-name": "plan",
      plan_version: "v2",
      city: selections.propertyCity || "",
      status: selections.status || "",
      wants_mowing: selections.wants_mowing || "",
      clipping_pref: selections.wants_mowing === "Yes" ? selections.clippings || "" : "N/A",
      lawn_health: selections.lawnHealth || "",
      bed_maintenance: selections.beds || "",
      spring_cleanup: selections.refresh || "",
      mulch_service: selections.mulch || "",
      trimming_plan: selections.bushes || "",
      fall_leaf_plan: selections.leaves || "",
      snow: selections.snow || "",
      hands_off_preference: selections.handsOff || "",
      care_profile_label: profile.label,
      care_profile_desc: profile.text,
      perennial_pruning: perennialPruning ? "Yes" : "No",
      salt_treatment: wantsSalt ? "Yes" : "No",
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload.toString(),
      });
      navigate("/request-confirmation");
    } catch (error) {
      alert("Oops! There was an issue sending your plan. Please call us directly.");
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / totalSteps) * 100;
  const profile = calculateProfile();
  const ProfileIcon = profile.icon;

  // OptionCard — now supports an optional social-proof badge
  const OptionCard = ({
    selected,
    onClick,
    icon: Icon,
    iconColor = "text-brand",
    title,
    description,
    badge,
    note,
  }: {
    selected: boolean;
    onClick: () => void;
    icon: React.ElementType;
    iconColor?: string;
    title: string;
    description?: string;
    badge?: string;
    note?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full cursor-pointer transition-all duration-200 border-2 rounded-2xl bg-card p-4 md:p-5 flex items-start gap-3 md:gap-4 text-left ${
        selected
          ? "border-brand bg-callout shadow-md"
          : "border-border hover:border-highlight hover:-translate-y-0.5"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-3 inline-flex items-center gap-1 bg-highlight text-ink text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          <Star className="w-3 h-3" />
          {badge}
        </span>
      )}
      <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="font-extrabold text-base md:text-lg text-ink">{title}</div>
        {description && (
          <p className="text-sm text-paragraph leading-snug">{description}</p>
        )}
        {note && (
          <p className="text-xs text-brand/80 italic leading-snug mt-1">{note}</p>
        )}
      </div>
    </button>
  );

  // Fall leaf care is mandatory — pick at least the Standard tier
  const renderFallLeafOptions = () => (
    <>
      <p className="text-paragraph mb-3 text-sm md:text-base leading-snug font-bold">
        Leaves pile up fast in DuPage. Pick how we handle them.
      </p>
      <div className="p-4 bg-callout border-2 border-brand/10 rounded-xl mb-4 text-sm text-brand font-bold text-center leading-snug">
        Leaf care is included in every plan to keep your lawn and hardscapes clear through fall.
      </div>
      <div className="space-y-3.5 pt-2">
        <OptionCard
          selected={selections.leaves === "Eco-Management"}
          onClick={() => selectOption("leaves", "Eco-Management", 10)}
          icon={RefreshCw}
          title="Standard Leaf Care"
          description="Using specialized mulching blades, leaves are finely shredded into the turf during weekly maintenance to control buildup and naturally feed the soil. The season ends with a deep cleanup visit to clear excess leaf cover from the lawn, hardscapes, and garden beds — leaving behind a minimal, healthy organic baseline."
          note="Weekly care covers the lawn and walkways/driveways. The final cleanup is the only visit that includes flower beds."
          badge="Most popular"
        />
        <OptionCard
          selected={selections.leaves === "Pristine Management"}
          onClick={() => selectOption("leaves", "Pristine Management", 20)}
          icon={Crown}
          title="Pristine Leaf Care"
          description="Leaves are fully removed every visit — lawn, walkways, and driveways stay 100% leaf-free all season. Flower beds are cleared during the final cleanup visit."
        />
      </div>
    </>
  );

  return (
    <div className="w-full px-4">
        {/* Main Form Container */}
        <div className="w-full max-w-2xl mx-auto bg-card rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 flex flex-col">
          {/* Progress Bar */}
          <div className="bg-brand px-6 py-3 text-center relative overflow-hidden flex-shrink-0">
            <div
              className={`w-full bg-ink/40 h-1.5 rounded-full overflow-hidden transition-opacity duration-500 ${
                currentStep === 1 ? "opacity-0" : "opacity-100"
              }`}
            >
              <div
                className="bg-highlight h-full transition-all duration-600 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-6 py-6 md:px-10 md:py-8 flex-1 flex flex-col"
          >
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {/* Step 1 — Welcome */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className="text-center space-y-6"
                  >
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-callout rounded-2xl rotate-6 absolute inset-0" />
                      <div className="w-16 h-16 bg-card border-2 border-brand rounded-2xl flex items-center justify-center relative z-10 -rotate-3">
                        <Map className="w-8 h-8 text-brand" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-headline text-2xl md:text-3xl text-ink">
                        Let's build your property plan.
                      </h2>
                      <p className="text-paragraph text-base md:text-lg max-w-xs mx-auto leading-relaxed">
                        A few quick questions — under 60 seconds — and you'll see exactly how we'd take care of your home.
                      </p>
                      <p className="text-paragraph/70 text-sm max-w-xs mx-auto leading-relaxed">
                        Nothing is locked in. We'll review everything together before you commit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary w-full py-4 rounded-2xl shadow-xl text-lg md:text-xl"
                    >
                      Start My Plan
                    </button>
                  </motion.div>
                )}

                {/* Step 2 — Location */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Where's your home?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base">
                      These are the areas we know best.
                    </p>
                    <div className="space-y-2.5">
                      <OptionCard
                        selected={selections.propertyCity === "Wheaton"}
                        onClick={() => selectOption("propertyCity", "Wheaton")}
                        icon={MapPin}
                        title="Wheaton"
                      />
                      <OptionCard
                        selected={selections.propertyCity === "Glen Ellyn"}
                        onClick={() => selectOption("propertyCity", "Glen Ellyn")}
                        icon={MapPin}
                        title="Glen Ellyn"
                      />
                      <OptionCard
                        selected={selections.propertyCity === "Winfield"}
                        onClick={() => selectOption("propertyCity", "Winfield")}
                        icon={MapPin}
                        title="Winfield"
                      />
                      <OptionCard
                        selected={selections.propertyCity === "Other area"}
                        onClick={() => selectOption("propertyCity", "Other area")}
                        icon={Compass}
                        iconColor="text-structure"
                        title="Another nearby area"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3 — Relationship */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Have we met before?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base">
                      Just so we know where you're coming from.
                    </p>
                    <div className="space-y-2.5">
                      <OptionCard
                        selected={selections.status === "Already a customer"}
                        onClick={() => selectOption("status", "Already a customer")}
                        icon={Heart}
                        title="I'm already a customer"
                      />
                      <OptionCard
                        selected={selections.status === "First time hiring a pro"}
                        onClick={() => selectOption("status", "First time hiring a pro")}
                        icon={UserPlus}
                        title="First time hiring a pro"
                      />
                      <OptionCard
                        selected={selections.status === "Looking to switch"}
                        onClick={() => selectOption("status", "Looking to switch")}
                        icon={RefreshCw}
                        title="Looking to switch teams"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4 — Mowing finish (mowing is mandatory) */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Scissors className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Let's start with the lawn.
                      </h2>
                    </div>
                    <p className="text-paragraph mb-3 text-sm md:text-base">
                      We'll mow and string-trim your lawn every week. How should we finish it?
                    </p>
                    <div className="p-4 bg-callout border-2 border-brand/10 rounded-xl mb-4 text-sm text-brand font-bold text-center leading-snug">
                      Every visit includes professional mowing + string trimming.
                    </div>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.clippings === "The Nutrient Standard"}
                        onClick={() =>
                          selectOption("clippings", "The Nutrient Standard", 5)
                        }
                        icon={Leaf}
                        title="Mulching Finish"
                        description="Our Nutrient Standard — clippings are finely shredded back into the lawn, where they act as a natural fertilizer that feeds the soil. Keeps the surface clean with zero waste."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.clippings === "The Pristine Standard"}
                        onClick={() =>
                          selectOption("clippings", "The Pristine Standard", 2)
                        }
                        icon={Package}
                        title="Bagging Finish"
                        description="Our Pristine Standard — we bag and haul away every clipping for a 100% clear surface after each visit."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 5 — Fall leaf care (MANDATORY) */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Now let's talk about fall.
                      </h2>
                    </div>
                    {renderFallLeafOptions()}
                  </motion.div>
                )}

                {/* Step 6 — Flower Bed Care: Weeding */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Flower2 className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Flower Bed Care
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base">
                      How should we handle weeds in your beds?
                    </p>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.beds === "The Clean Look Plan"}
                        onClick={() =>
                          selectOption("beds", "The Clean Look Plan", 10)
                        }
                        icon={Zap}
                        title="Basic Weed Control"
                        description="Our Clean Look Plan — we use string trimmers regularly to keep weeds at bay. A tidy, maintained look for a practical price."
                      />
                      <OptionCard
                        selected={selections.beds === "The Estate Detail Plan"}
                        onClick={() =>
                          selectOption("beds", "The Estate Detail Plan", 20)
                        }
                        icon={Sparkles}
                        title="Hand-Pulled Detail"
                        description="Our Estate Detail Plan — weeds are hand-pulled from the root for a pristine bed surface. Beds stay crisp and well-defined all season."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.beds === "Homeowner Managed"}
                        onClick={() =>
                          selectOption("beds", "Homeowner Managed", 0)
                        }
                        icon={User}
                        iconColor="text-structure"
                        title="I'll handle weeding myself"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 7 — Flower Bed Care: Mulch */}
                {currentStep === 7 && (
                  <motion.div
                    key="step7"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Flower2 className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Flower Bed Care
                      </h2>
                    </div>
                    <p className="text-paragraph mb-3 text-sm md:text-base">
                      Would you like a fresh spring mulch install to reset your beds?
                    </p>
                    <div className="p-4 bg-callout border-2 border-brand/10 rounded-xl mb-4 text-sm text-brand font-bold text-center leading-snug">
                      Includes: Spade Edging + Fresh Mulch Install + Weed Preventer
                    </div>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.mulch === "Amigos Handles Mulch"}
                        onClick={() =>
                          selectOption("mulch", "Amigos Handles Mulch", 10)
                        }
                        icon={CheckCircle}
                        title="Yes — Amigos handles mulch"
                        description="A full spring reset: clean edges, a fresh layer of mulch, and pre-emergent weed preventer to keep beds looking sharp through the season."
                      />
                      <OptionCard
                        selected={selections.mulch === "Homeowner Managed"}
                        onClick={() =>
                          selectOption("mulch", "Homeowner Managed", 0)
                        }
                        icon={User}
                        iconColor="text-structure"
                        title="I'll handle mulch myself"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 8 — How hands-off */}
                {currentStep === 8 && (
                  <motion.div
                    key="step8"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Feather className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        How hands-off do you want to be?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base">
                      This helps us calibrate everything else — no wrong answer.
                    </p>
                    <div className="space-y-2.5">
                      <OptionCard
                        selected={selections.handsOff === "Just the essentials"}
                        onClick={() => selectOption("handsOff", "Just the essentials")}
                        icon={Hand}
                        title="Just the essentials"
                        description="I'm okay with a simple, practical setup. I'll fill in the gaps myself."
                      />
                      <OptionCard
                        selected={selections.handsOff === "Keep things sharper"}
                        onClick={() => selectOption("handsOff", "Keep things sharper")}
                        icon={ThumbsUp}
                        title="Keep things sharper"
                        description="I want my property to look well-kept most of the year without micromanaging it."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.handsOff === "Fully handled"}
                        onClick={() => selectOption("handsOff", "Fully handled")}
                        icon={ShieldCheck}
                        title="Fully handled"
                        description="I don't want to think about it. Just make sure everything is taken care of."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 9 — Lawn Improvement (optional enhancement) */}
                {currentStep === 9 && (
                  <motion.div
                    key="step9"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        Want a thicker, greener lawn?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-3 text-sm md:text-base leading-snug">
                      Optional. Aeration pulls small plugs of soil out of the lawn so water, air, and nutrients can reach the roots — and overseeding fills in thin spots with fresh grass.
                    </p>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.lawnHealth === "Essential Health"}
                        onClick={() =>
                          selectOption("lawnHealth", "Essential Health", 10)
                        }
                        icon={Sprout}
                        title="Essential Boost"
                        description="Our Essential Health tier — spring aeration plus overseeding. A strong yearly reset that thickens the lawn over time."
                      />
                      <OptionCard
                        selected={selections.lawnHealth === "The Elite Standard"}
                        onClick={() =>
                          selectOption("lawnHealth", "The Elite Standard", 20)
                        }
                        icon={Award}
                        title="Elite Lawn Care"
                        description="Our Elite Standard — spring AND fall aeration with overseeding. The fastest path to a thick, healthy lawn."
                        badge="Best results"
                      />
                      <OptionCard
                        selected={selections.lawnHealth === "Homeowner Managed"}
                        onClick={() =>
                          selectOption("lawnHealth", "Homeowner Managed", 0)
                        }
                        icon={User}
                        iconColor="text-structure"
                        title="Skip this for now"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 10 — Spring cleanup */}
                {currentStep === 10 && (
                  <motion.div
                    key="step10"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        How should spring start?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-3 text-sm md:text-base leading-snug">
                      A one-time early-spring reset that clears the winter mess off the lawn and beds before the season kicks in.
                    </p>
                    <div className="p-4 bg-callout border-2 border-brand/10 rounded-xl mb-4 text-sm text-brand font-bold text-center leading-snug">
                      Includes: Removal of leaves, sticks & debris from the lawn and flower beds, clearing of dead plant material, and collection & staging of debris.
                    </div>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.refresh === "Pristine"}
                        onClick={() => selectOption("refresh", "Pristine", 10)}
                        icon={Truck}
                        title="Full Haul-Off"
                        description="We collect and dispose of every leaf, stick, and bit of debris off your property — lawn and beds left spotless."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.refresh === "Nutrient"}
                        onClick={() => selectOption("refresh", "Nutrient", 10)}
                        icon={RefreshCw}
                        title="Mulch-In Reset"
                        description="We shred everything back into the lawn and beds — natural recycling that feeds the soil at no extra haul-away cost."
                      />
                      <OptionCard
                        selected={selections.refresh === "Homeowner Managed"}
                        onClick={() => selectOption("refresh", "Homeowner Managed", 0)}
                        icon={User}
                        iconColor="text-structure"
                        title="Skip this for now"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 11 — Trimming & pruning */}
                {currentStep === 11 && (
                  <motion.div
                    key="step11"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Brush className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        What about your bushes?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base leading-snug">
                      Optional. Professional shaping gives bushes that tight, well-defined silhouette and keeps growth healthy.
                    </p>
                    <div className="space-y-3.5 pt-2">
                      <OptionCard
                        selected={selections.bushes === "Annual Shaping"}
                        onClick={() => selectOption("bushes", "Annual Shaping", 10)}
                        icon={Scissors}
                        title="Yearly Shape-Up"
                        description="Our Annual Shaping tier — one professional visit a year to keep bushes tight and neat."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.bushes === "Premium Managed Shaping"}
                        onClick={() =>
                          selectOption("bushes", "Premium Managed Shaping", 20)
                        }
                        icon={Sparkles}
                        title="Premium Upkeep"
                        description="Our Premium Managed Shaping tier — we shape bushes whenever they start looking shaggy, so you never have to ask."
                      />
                      <OptionCard
                        selected={selections.bushes === "Homeowner Managed"}
                        onClick={() => selectOption("bushes", "Homeowner Managed", 0)}
                        icon={User}
                        iconColor="text-structure"
                        title="Skip this for now"
                      />
                    </div>

                    <div className="mt-4 p-4 bg-cloud rounded-xl border-2 border-dashed border-structure/30">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={perennialPruning}
                          onChange={(e) => setPerennialPruning(e.target.checked)}
                          className="w-5 h-5 accent-brand cursor-pointer flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-ink font-bold">
                          Add perennial flower pruning?
                          <span className="block font-normal text-xs text-paragraph mt-0.5 leading-snug">
                            Technical pruning of perennial flowers at the correct times of year, so they bloom stronger next season.
                          </span>
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Step 12 — Snow */}
                {currentStep === 12 && (
                  <motion.div
                    key="step12"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Snowflake className="w-6 h-6 text-highlight flex-shrink-0" />
                      <h2 className="font-headline text-xl md:text-2xl text-ink">
                        And winter — should we plow for you?
                      </h2>
                    </div>
                    <p className="text-paragraph mb-4 text-sm md:text-base leading-snug">
                      Optional. Pick the threshold that fits how you use your driveway.
                    </p>
                    <div className="space-y-2.5">
                      <OptionCard
                        selected={selections.snow === "Standard Snow Removal"}
                        onClick={() =>
                          selectOption("snow", "Standard Snow Removal", 10)
                        }
                        icon={Truck}
                        title="Standard Snow Removal"
                        description="Service kicks in after 2 inches of accumulation."
                        badge="Most popular"
                      />
                      <OptionCard
                        selected={selections.snow === "Premium Snow Removal"}
                        onClick={() =>
                          selectOption("snow", "Premium Snow Removal", 15)
                        }
                        icon={Crown}
                        title="Premium Snow Removal"
                        description="Priority service starts at just 1 inch of accumulation."
                      />
                      <OptionCard
                        selected={selections.snow === "Zero Tolerance Snow Removal"}
                        onClick={() =>
                          selectOption("snow", "Zero Tolerance Snow Removal", 20)
                        }
                        icon={ShieldCheck}
                        title="Zero Tolerance"
                        description="Any snowfall triggers service — your property stays clear at all times."
                      />
                      <OptionCard
                        selected={selections.snow === "Homeowner Managed"}
                        onClick={() =>
                          selectOption("snow", "Homeowner Managed", 0)
                        }
                        icon={User}
                        iconColor="text-structure"
                        title="No thanks, I'll handle snow myself"
                      />
                    </div>

                    {(selections.snow === "Standard Snow Removal" ||
                      selections.snow === "Premium Snow Removal" ||
                      selections.snow === "Zero Tolerance Snow Removal") && (
                      <div className="mt-4 p-4 bg-cloud rounded-xl border-2 border-dashed border-structure/30">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={wantsSalt}
                            onChange={(e) => setWantsSalt(e.target.checked)}
                            className="w-5 h-5 accent-brand cursor-pointer flex-shrink-0"
                          />
                          <span className="text-sm text-ink font-bold">
                            Add salt treatment?
                            <span className="block font-normal text-xs text-paragraph mt-0.5">
                              Ice-melt on walkways and driveways after each clearing.
                            </span>
                          </span>
                        </label>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 13 — Summary & Contact */}
                {currentStep === 13 && (
                  <motion.div
                    key="step13"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-10">
                      <h2 className="font-headline text-2xl md:text-3xl text-ink mb-6">
                        Your Property Care Profile
                      </h2>

                      <div className="mb-6 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-brand text-highlight flex items-center justify-center shadow-xl border-4 border-highlight mb-4">
                          <ProfileIcon className="w-10 h-10" />
                        </div>
                        <div className="font-headline text-xl text-brand uppercase tracking-[0.2em] mb-2">
                          {profile.label}
                        </div>
                      </div>

                      <div className="bg-callout border-2 border-brand/20 p-6 md:p-8 rounded-3xl">
                        <p className="text-base text-paragraph font-bold leading-relaxed">
                          {profile.text}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={editPlan}
                        className="mt-6 text-structure font-bold hover:text-brand flex items-center justify-center gap-2 mx-auto text-sm uppercase tracking-widest transition"
                      >
                        <Edit2 className="w-4 h-4" /> Edit My Selections
                      </button>
                    </div>

                    <div className="space-y-4 mb-8">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                      />
                      <input
                        type="text"
                        placeholder="Property Address"
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, address: e.target.value }))
                        }
                        className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="bg-cloud rounded-2xl p-6 md:p-8 border border-structure/20 mb-8">
                      <h3 className="text-[10px] md:text-xs font-extrabold text-brand uppercase tracking-[0.3em] mb-4">
                        Roadmap Summary
                      </h3>
                      <ul className="space-y-3 text-base font-bold text-ink">
                        <li>
                          <span className="text-highlight mr-2">★</span>City:{" "}
                          {selections.propertyCity}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Status:{" "}
                          {selections.status}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Mowing Finish:{" "}
                          {selections.clippings}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Fall Leaves:{" "}
                          {selections.leaves}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Flower Beds:{" "}
                          {selections.beds}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Mulch:{" "}
                          {selections.mulch}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Comfort Level:{" "}
                          {selections.handsOff}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Lawn Improvement:{" "}
                          {selections.lawnHealth}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Spring Cleanup:{" "}
                          {selections.refresh}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Bush Care:{" "}
                          {selections.bushes}
                        </li>
                        <li>
                          <span className="text-highlight mr-2">★</span>Winter Snow:{" "}
                          {selections.snow}
                        </li>
                        {perennialPruning && (
                          <li>
                            <span className="text-highlight mr-2">★</span>Perennial pruning included
                          </li>
                        )}
                      </ul>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl text-xl disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-7 h-7 animate-spin" /> Sending Plan...
                        </>
                      ) : (
                        <>
                          <Send className="w-7 h-7" /> Request My Property Plan Review
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            {currentStep > 1 && currentStep < 13 && (
              <div className="pt-5 md:pt-6 flex justify-between items-center flex-shrink-0 border-t border-border/30 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-structure font-bold hover:text-ink px-4 py-2 transition text-base md:text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className={`btn-primary px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg text-base md:text-lg ${
                    shakeNext ? "animate-shake" : ""
                  }`}
                >
                  {currentStep === 12 ? "Review My Profile" : "Next Step"}
                </button>
              </div>
            )}
          </form>
        </div>
    </div>
  );
};

export default PlanQuiz;
