import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Map, MapPin, Compass, MessageCircle, Heart, UserPlus, RefreshCw, Scissors, Leaf, Package, Sprout, Award, User, Flower2, Zap, Sparkles, Calendar, CheckCircle, Brush, Wind, Crown, CheckCheck, ShieldCheck, Users2, ThumbsUp, Edit2, Send, Loader2, CalendarCheck, Target, Snowflake, Truck, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SelectionKey = "propertyCity" | "status" | "wants_mowing" | "clippings" | "lawnHealth" | "beds" | "refresh" | "bushes" | "leaves" | "snow";

interface Selections {
  propertyCity: string | null;
  status: string | null;
  wants_mowing: string | null;
  clippings: string | null;
  lawnHealth: string | null;
  beds: string | null;
  refresh: string | null;
  bushes: string | null;
  leaves: string | null;
  snow: string | null;
}

interface ScorePoints {
  clippings: number;
  lawnHealth: number;
  beds: number;
  refresh: number;
  bushes: number;
  leaves: number;
  snow: number;
}

const Plan = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 12;

  const [selections, setSelections] = useState<Selections>({
    propertyCity: null,
    status: null,
    wants_mowing: null,
    clippings: null,
    lawnHealth: null,
    beds: null,
    refresh: null,
    bushes: null,
    leaves: null,
    snow: null
  });

  const [scorePoints, setScorePoints] = useState<ScorePoints>({
    clippings: 0,
    lawnHealth: 0,
    beds: 0,
    refresh: 0,
    bushes: 0,
    leaves: 0,
    snow: 0
  });

  const [fertilizerSync, setFertilizerSync] = useState(false);
  const [perennialPruning, setPerennialPruning] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);

  const selectOption = (category: SelectionKey, value: string, points: number = 0) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));

    if (category in scorePoints) {
      setScorePoints(prev => ({
        ...prev,
        [category]: points
      }));
    }
  };

  const calculateProfile = () => {
    const total = Object.values(scorePoints).reduce((a, b) => a + b, 0);
    if (total >= 60) {
      return {
        label: "Total Peace of Mind",
        icon: ShieldCheck,
        text: "It sounds like you have a high-value property but zero time to worry about it. You're looking for total professional oversight so you can just enjoy the results. We are a great fit!"
      };
    } else if (total >= 10) {
      return {
        label: "The Heavy Lifting Plan",
        icon: Users2,
        text: "It sounds like you love your yard but need a team to manage the technical tasks and exhausting seasonal chores while you stay involved in the beauty. We are a great fit!"
      };
    } else {
      return {
        label: "The Self-Reliance Profile",
        icon: UserCheck,
        text: "It sounds like you're an owner who takes real pride in handling the day-to-day property care yourself. You just need a reliable team for the technical stuff and seasonal heavy-lifting. We are a great fit!"
      };
    }
  };

  const stepValidation: Record<number, SelectionKey> = {
    2: "propertyCity",
    3: "status",
    4: "wants_mowing",
    5: "clippings",
    6: "lawnHealth",
    7: "beds",
    8: "refresh",
    9: "bushes",
    10: "leaves",
    11: "snow"
  };

  const nextStep = () => {
    const requiredCategory = stepValidation[currentStep];
    if (requiredCategory && !selections[requiredCategory]) {
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }

    // If user says "No" to mowing, skip step 5 (clipping style)
    if (currentStep === 4 && selections.wants_mowing === "No") {
      setCurrentStep(6);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    // If on step 6 and user said No to mowing, go back to step 4
    if (currentStep === 6 && selections.wants_mowing === "No") {
      setCurrentStep(4);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const editPlan = () => {
    setCurrentStep(2);
  };

  useEffect(() => {
    if (currentStep === 12) {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check honeypot field - if filled, it's a bot
    const formElement = e.currentTarget;
    const honeypot = formElement.querySelector<HTMLInputElement>('input[name="bot-field"]');
    if (honeypot && honeypot.value) {
      // Silently reject bot submission
      navigate("/request-confirmation");
      return;
    }

    // Validate that user actually completed the form steps
    if (!selections.propertyCity || !selections.status || !formData.name || !formData.email) {
      alert("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    const profile = calculateProfile();

    const formPayload = new URLSearchParams({
      "form-name": "plan",
      city: selections.propertyCity || "",
      status: selections.status || "",
      wants_mowing: selections.wants_mowing || "",
      clipping_pref: selections.wants_mowing === "Yes" ? (selections.clippings || "") : "N/A",
      lawn_health: selections.lawnHealth || "",
      bed_maintenance: selections.beds || "",
      spring_refresh: selections.refresh || "",
      trimming_plan: selections.bushes || "",
      fall_leaf_plan: selections.leaves || "",
      snow: selections.snow || "",
      care_profile_label: profile.label,
      care_profile_desc: profile.text,
      fertilizer_sync: fertilizerSync ? "Yes" : "No",
      perennial_pruning: perennialPruning ? "Yes" : "No",
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formPayload.toString()
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

  const OptionCard = ({
    selected,
    onClick,
    icon: Icon,
    iconColor = "text-brand",
    title,
    description
  }: {
    selected: boolean;
    onClick: () => void;
    icon: React.ElementType;
    iconColor?: string;
    title: string;
    description?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full cursor-pointer transition-all duration-200 border-2 rounded-2xl bg-card p-4 md:p-5 flex items-start gap-3 md:gap-4 text-left ${
        selected
          ? "border-brand bg-[#F9FBE7] shadow-md"
          : "border-border hover:border-highlight hover:-translate-y-0.5"
      }`}
    >
      <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="font-extrabold text-base md:text-lg text-ink">{title}</div>
        {description && <p className="text-sm text-paragraph leading-snug">{description}</p>}
      </div>
    </button>
  );

  // Fall leaf options change based on mowing choice
  const renderFallLeafOptions = () => {
    if (selections.wants_mowing === "Yes") {
      return (
        <>
          <p className="text-paragraph mb-4 text-sm md:text-base leading-snug font-bold">When the leaves fall, what level of service do you need?</p>
          <div className="space-y-2.5">
            <OptionCard selected={selections.leaves === "Eco-Management"} onClick={() => selectOption("leaves", "Eco-Management", 10)} icon={RefreshCw} title="Eco-Management" description="Mulch leaves into soil weekly for natural fertilizer." />
            <OptionCard selected={selections.leaves === "Standard (Eco-Plus)"} onClick={() => selectOption("leaves", "Standard (Eco-Plus)", 15)} icon={CheckCheck} title="Standard: Eco-Plus Tier" description="Weekly mulching plus one deep final cleanup." />
            <OptionCard selected={selections.leaves === "Pristine Management"} onClick={() => selectOption("leaves", "Pristine Management", 20)} icon={Crown} title="The Elite Tier" description="Property stays 100% leaf-free every week." />
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className="text-paragraph mb-4 text-sm md:text-base leading-snug font-bold">Would you like Amigos to handle a professional final cleanup?</p>
          <div className="space-y-2.5">
            <OptionCard selected={selections.leaves === "Deep Final Cleanup Only"} onClick={() => selectOption("leaves", "Deep Final Cleanup Only", 10)} icon={Wind} title="One-Time Deep Final Cleanup" description="One thorough property clearing before winter." />
            <OptionCard selected={selections.leaves === "Homeowner Managed"} onClick={() => selectOption("leaves", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="I'll handle this" description="I rake and bag my own leaves." />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Plan Your 2026 Property Roadmap | Amigos Landscaping</title>
        <meta name="description" content="Build your personalized 2026 property care roadmap in under 60 seconds with Amigos Landscaping." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-12 px-4 md:px-8">
        {/* Hidden Netlify Form for detection */}
        <form name="plan" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="plan" />
          <input type="text" name="bot-field" />
          <input type="text" name="city" />
          <input type="text" name="status" />
          <input type="text" name="wants_mowing" />
          <input type="text" name="clipping_pref" />
          <input type="text" name="lawn_health" />
          <input type="text" name="bed_maintenance" />
          <input type="text" name="spring_refresh" />
          <input type="text" name="trimming_plan" />
          <input type="text" name="fall_leaf_plan" />
          <input type="text" name="snow" />
          <input type="text" name="care_profile_label" />
          <input type="text" name="care_profile_desc" />
          <input type="text" name="fertilizer_sync" />
          <input type="text" name="perennial_pruning" />
          <input type="text" name="name" />
          <input type="text" name="address" />
          <input type="tel" name="phone" />
          <input type="email" name="email" />
        </form>

        {/* Landing Headline */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-4 mb-8">
          <h1 className="font-headline text-4xl md:text-5xl text-ink">Plan Your 2026 Property Roadmap</h1>
          <p className="font-accent text-2xl md:text-3xl text-brand">"We don't just mow; we manage."</p>
        </div>

        {/* Context Cards */}
        <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card p-6 rounded-2xl border-2 border-brand/5 shadow-sm space-y-2">
            <h4 className="font-headline text-lg text-brand flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-highlight" /> Start Fresh
            </h4>
            <p className="text-sm text-paragraph leading-relaxed font-medium">Regardless of the month, plan as if you're starting the season fresh. We'll adjust the timing for you once we connect.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border-2 border-brand/5 shadow-sm space-y-2">
            <h4 className="font-headline text-lg text-brand flex items-center gap-2">
              <Target className="w-5 h-5 text-highlight" /> Ideal Plan
            </h4>
            <p className="text-sm text-paragraph leading-relaxed font-medium">Select the services you'd ideally want. We build every plan to align with your specific goals and budget.</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-2xl mx-auto bg-card rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 mb-12 flex flex-col">
          {/* Progress Bar - Header Zone */}
          <div className="bg-brand px-6 py-3 text-center relative overflow-hidden flex-shrink-0">
            <div className={`w-full bg-ink/40 h-1.5 rounded-full overflow-hidden transition-opacity duration-500 ${currentStep === 1 ? 'opacity-0' : 'opacity-100'}`}>
              <div
                className="bg-highlight h-full transition-all duration-600 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Content - Flex container for content + footer */}
          <form name="plan" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} className="px-6 py-6 md:px-10 md:py-8 flex-1 flex flex-col">
            <input type="hidden" name="form-name" value="plan" />
            {/* Honeypot field - hidden from real users, bots fill it */}
            <p className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>
            {/* Content Zone */}
            <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1: Welcome */}
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
                    <div className="w-16 h-16 bg-[#F9FBE7] rounded-2xl rotate-6 absolute inset-0" />
                    <div className="w-16 h-16 bg-card border-2 border-brand rounded-2xl flex items-center justify-center relative z-10 -rotate-3">
                      <Map className="w-8 h-8 text-brand" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">Ready to see how we can help?</h2>
                    <p className="text-paragraph text-base md:text-lg max-w-xs mx-auto leading-relaxed">Build your roadmap in under 60 seconds and see our suggestions for your property.</p>
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

              {/* Step 2: Location */}
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
                    <h2 className="font-headline text-xl md:text-2xl text-ink">Home Location</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base">We serve these core local areas.</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.propertyCity === "Wheaton"} onClick={() => selectOption("propertyCity", "Wheaton")} icon={MapPin} title="Wheaton" />
                    <OptionCard selected={selections.propertyCity === "Glen Ellyn"} onClick={() => selectOption("propertyCity", "Glen Ellyn")} icon={MapPin} title="Glen Ellyn" />
                    <OptionCard selected={selections.propertyCity === "Winfield"} onClick={() => selectOption("propertyCity", "Winfield")} icon={MapPin} title="Winfield" />
                    <OptionCard selected={selections.propertyCity === "Other area"} onClick={() => selectOption("propertyCity", "Other area")} icon={Compass} iconColor="text-structure" title="Other nearby area" />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Status */}
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
                    <h2 className="font-headline text-xl md:text-2xl text-ink">Relationship</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base">Have we helped you manage your property before?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.status === "Already a customer"} onClick={() => selectOption("status", "Already a customer")} icon={Heart} title="I'm already a customer" />
                    <OptionCard selected={selections.status === "First time hiring a pro"} onClick={() => selectOption("status", "First time hiring a pro")} icon={UserPlus} title="First time hiring a pro" />
                    <OptionCard selected={selections.status === "Looking to switch"} onClick={() => selectOption("status", "Looking to switch")} icon={RefreshCw} title="Looking to switch teams" />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Mowing Decision */}
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
                    <h2 className="font-headline text-xl md:text-2xl text-ink">I. Mowing Support</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base">Who will be handling the weekly mowing?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.wants_mowing === "Yes"} onClick={() => selectOption("wants_mowing", "Yes")} icon={CheckCircle} title="Amigos handles it" description="Includes professional weekly mowing and string trimming." />
                    <OptionCard selected={selections.wants_mowing === "No"} onClick={() => selectOption("wants_mowing", "No")} icon={User} iconColor="text-structure" title="I'll handle this" description="I handle my own mowing; I'm looking for other support." />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Mowing Style (conditional - only if wants_mowing = Yes) */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Scissors className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">Mowing Style</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base">How should we manage the grass clippings?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.clippings === "The Nutrient Standard"} onClick={() => selectOption("clippings", "The Nutrient Standard", 5)} icon={Leaf} title="The Nutrient Standard (Mulching)" description="We shred clippings back into the lawn to feed the soil naturally." />
                    <OptionCard selected={selections.clippings === "The Pristine Standard"} onClick={() => selectOption("clippings", "The Pristine Standard", 2)} icon={Package} title="The Pristine Standard (Bagging)" description="We bag and haul away all clippings for a 100% clear surface." />
                  </div>
                </motion.div>
              )}

              {/* Step 6: Lawn Health */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">II. Lawn Health</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base font-bold leading-snug">Who is handling the aeration and seasonal thickness of your grass?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.lawnHealth === "Homeowner Managed"} onClick={() => selectOption("lawnHealth", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="I'll handle this" />
                    <OptionCard selected={selections.lawnHealth === "The Essential Refresh"} onClick={() => selectOption("lawnHealth", "The Essential Refresh", 10)} icon={Sprout} title="The Essential Refresh (Spring Aeration/Seed)" />
                    <OptionCard selected={selections.lawnHealth === "The Elite Standard"} onClick={() => selectOption("lawnHealth", "The Elite Standard", 20)} icon={Award} title="The Elite Standard (Spring & Fall Aeration)" />
                  </div>

                  <div className="mt-4 p-4 bg-cloud rounded-xl border-2 border-dashed border-structure/30">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={fertilizerSync}
                        onChange={(e) => setFertilizerSync(e.target.checked)}
                        className="w-5 h-5 accent-brand cursor-pointer flex-shrink-0"
                      />
                      <span className="text-sm text-ink font-bold">
                        Fertilizer Sync?
                        <span className="block font-normal text-xs text-paragraph mt-0.5">Coordinate with your licensed chemical partner to sync treatments.</span>
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 7: Garden Beds */}
              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Flower2 className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">III. Garden Beds</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base font-bold">Who handles keeping the garden beds clear of weeds?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.beds === "Homeowner Managed"} onClick={() => selectOption("beds", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="I'll handle this" />
                    <OptionCard selected={selections.beds === "The Clean Look Plan"} onClick={() => selectOption("beds", "The Clean Look Plan", 10)} icon={Zap} title='The "Clean Look" Plan' description="We use string trimmers weekly to keep weeds at bay." />
                    <OptionCard selected={selections.beds === "The Estate Detail Plan"} onClick={() => selectOption("beds", "The Estate Detail Plan", 20)} icon={Sparkles} title='The "Estate Detail" Plan' description="Hand-pull weeds from the root for a pristine bed surface." />
                  </div>
                </motion.div>
              )}

              {/* Step 8: Spring Refresh */}
              {currentStep === 8 && (
                <motion.div
                  key="step8"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">IV. Spring Reset</h2>
                  </div>
                  <p className="text-paragraph mb-3 text-sm md:text-base font-bold text-center">Should Amigos perform a professional "Spring Refresh" in April?</p>

                  <div className="p-4 bg-[#F9FBE7] border-2 border-brand/10 rounded-xl mb-4 text-sm text-brand font-bold text-center leading-snug">
                    Includes: Debris Cleanup + Spade Edging + Mulch + Weed Preventer
                  </div>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.refresh === "Perform Full Refresh"} onClick={() => selectOption("refresh", "Perform Full Refresh", 10)} icon={CheckCircle} title="Amigos handles this" />
                    <OptionCard selected={selections.refresh === "Homeowner Managed"} onClick={() => selectOption("refresh", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="No, I'll handle this." />
                  </div>
                </motion.div>
              )}

              {/* Step 9: Trimming & Pruning */}
              {currentStep === 9 && (
                <motion.div
                  key="step9"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brush className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">V. Trimming & Pruning</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base font-bold leading-snug">How should we handle the professional shaping of your ornamentals?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.bushes === "Homeowner Managed"} onClick={() => selectOption("bushes", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="I'll handle this" />
                    <OptionCard selected={selections.bushes === "Annual Shaping"} onClick={() => selectOption("bushes", "Annual Shaping", 10)} icon={Scissors} title="Annual Shaping (1 visit/yr)" description="One professional visit to keep bushes tight and neat." />
                    <OptionCard selected={selections.bushes === "Premium Managed Shaping"} onClick={() => selectOption("bushes", "Premium Managed Shaping", 20)} icon={Sparkles} title="Premium Managed Support" description="We shape them whenever they look shaggy." />
                  </div>

                  <div className="mt-4 p-4 bg-cloud rounded-xl border-2 border-dashed border-structure/30">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={perennialPruning}
                        onChange={(e) => setPerennialPruning(e.target.checked)}
                        className="w-5 h-5 accent-brand cursor-pointer flex-shrink-0"
                      />
                      <span className="text-sm text-ink font-bold">
                        Flower Pruning?
                        <span className="block font-normal text-xs text-paragraph mt-0.5">Handle technical pruning of perennial flowers at the correct times.</span>
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 10: Fall Leaves */}
              {currentStep === 10 && (
                <motion.div
                  key="step10"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">VI. Fall Leaves</h2>
                  </div>
                  {renderFallLeafOptions()}
                </motion.div>
              )}

              {/* Step 11: Snow Removal */}
              {currentStep === 11 && (
                <motion.div
                  key="step11"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Snowflake className="w-6 h-6 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-xl md:text-2xl text-ink">VII. Winter Protection</h2>
                  </div>
                  <p className="text-paragraph mb-4 text-sm md:text-base font-bold text-center leading-snug">Should Amigos handle your residential snow removal this winter?</p>

                  <div className="space-y-2.5">
                    <OptionCard selected={selections.snow === "Professional Snow Contract"} onClick={() => selectOption("snow", "Professional Snow Contract", 10)} icon={Truck} title="Yes, include snow removal" />
                    <OptionCard selected={selections.snow === "Homeowner Managed"} onClick={() => selectOption("snow", "Homeowner Managed", 0)} icon={User} iconColor="text-structure" title="No, I'll handle this" />
                  </div>
                </motion.div>
              )}

              {/* Step 12: Summary & Contact */}
              {currentStep === 12 && (
                <motion.div
                  key="step12"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="font-headline text-2xl md:text-3xl text-ink mb-6">Your Property Care Profile</h2>

                    <div className="mb-6 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-brand text-highlight flex items-center justify-center shadow-xl border-4 border-highlight mb-4">
                        <ProfileIcon className="w-10 h-10" />
                      </div>
                      <div className="font-headline text-xl text-brand uppercase tracking-[0.2em] mb-2">{profile.label}</div>
                    </div>

                    <div className="bg-[#F9FBE7] border-2 border-brand/20 p-6 md:p-8 rounded-3xl">
                      <p className="text-base text-paragraph font-bold leading-relaxed">{profile.text}</p>
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                    />
                    <input
                      type="text"
                      placeholder="Property Address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="bg-cloud rounded-2xl p-6 md:p-8 border border-structure/20 mb-8">
                    <h3 className="text-[10px] md:text-xs font-extrabold text-brand uppercase tracking-[0.3em] mb-4">Roadmap Summary</h3>
                    <ul className="space-y-3 text-base font-bold text-ink">
                      <li><span className="text-highlight mr-2">★</span>City: {selections.propertyCity}</li>
                      <li><span className="text-highlight mr-2">★</span>Status: {selections.status}</li>
                      <li><span className="text-highlight mr-2">★</span>Mowing: {selections.wants_mowing === "Yes" ? selections.clippings : "I'll handle this"}</li>
                      <li><span className="text-highlight mr-2">★</span>Lawn Health: {selections.lawnHealth}</li>
                      <li><span className="text-highlight mr-2">★</span>Garden Beds: {selections.beds}</li>
                      <li><span className="text-highlight mr-2">★</span>Spring Refresh: {selections.refresh}</li>
                      <li><span className="text-highlight mr-2">★</span>Bush Care: {selections.bushes}</li>
                      <li><span className="text-highlight mr-2">★</span>Fall Leaves: {selections.leaves}</li>
                      <li><span className="text-highlight mr-2">★</span>Winter Snow: {selections.snow}</li>
                      {fertilizerSync && <li><span className="text-highlight mr-2">★</span>Chemical Coordination sync requested</li>}
                      {perennialPruning && <li><span className="text-highlight mr-2">★</span>Perennial Pruning sync requested</li>}
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

            {/* Footer Zone - Navigation Buttons - Anchored at bottom */}
            {currentStep > 1 && currentStep < 12 && (
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
                  className={`btn-primary px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg text-base md:text-lg ${shakeNext ? 'animate-shake' : ''}`}
                >
                  {currentStep === 11 ? "Review My Profile" : "Next Step"}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Plan;
