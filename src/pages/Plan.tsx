import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Map, MapPin, Compass, MessageCircle, Heart, UserPlus, RefreshCw, Scissors, Leaf, Package, Sprout, Award, User, Flower2, Zap, Sparkles, Calendar, CheckCircle, Brush, Wind, Crown, CheckCheck, ShieldCheck, Users2, ThumbsUp, Edit2, Send, Loader2, CalendarCheck, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
type SelectionKey = "propertyCity" | "status" | "clippings" | "lawnHealth" | "beds" | "refresh" | "bushes" | "leaves";
interface Selections {
  propertyCity: string | null;
  status: string | null;
  clippings: string | null;
  lawnHealth: string | null;
  beds: string | null;
  refresh: string | null;
  bushes: string | null;
  leaves: string | null;
}
interface ScorePoints {
  clippings: number;
  lawnHealth: number;
  beds: number;
  refresh: number;
  bushes: number;
  leaves: number;
}
const Plan = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const [selections, setSelections] = useState<Selections>({
    propertyCity: null,
    status: null,
    clippings: null,
    lawnHealth: null,
    beds: null,
    refresh: null,
    bushes: null,
    leaves: null
  });
  const [scorePoints, setScorePoints] = useState<ScorePoints>({
    clippings: 0,
    lawnHealth: 0,
    beds: 0,
    refresh: 0,
    bushes: 0,
    leaves: 0
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
    if (total > 70) {
      return {
        label: "Total Peace of Mind",
        icon: ShieldCheck,
        text: "It sounds like you have a high-value property but zero time to worry about it. You're looking for total professional oversight so you can just enjoy the results. We are a great fit!"
      };
    } else if (total > 35) {
      return {
        label: "The Heavy Lifting Plan",
        icon: Users2,
        text: "It sounds like you love your yard but need a team to manage the technically difficult tasks and exhausting seasonal chores while you stay involved in the beauty."
      };
    } else {
      return {
        label: "Reliable Weekly Support",
        icon: ThumbsUp,
        text: "It sounds like you need a reliable hand for the heavy weekly lifting while you care for the details. You just want someone consistent who shows up on time. We are a great fit!"
      };
    }
  };
  const stepValidation: Record<number, SelectionKey> = {
    2: "propertyCity",
    3: "status",
    4: "clippings",
    5: "lawnHealth",
    6: "beds",
    7: "refresh",
    8: "bushes",
    9: "leaves"
  };
  const nextStep = () => {
    const requiredCategory = stepValidation[currentStep];
    if (requiredCategory && !selections[requiredCategory]) {
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const editPlan = () => {
    setCurrentStep(2);
  };
  useEffect(() => {
    if (currentStep === 10) {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const profile = calculateProfile();
    const formPayload = new URLSearchParams({
      "form-name": "property-plan-2026",
      city: selections.propertyCity || "",
      status: selections.status || "",
      mowing_plan: selections.clippings || "",
      lawn_health: selections.lawnHealth || "",
      bed_maintenance: selections.beds || "",
      spring_refresh: selections.refresh || "",
      trimming_plan: selections.bushes || "",
      fall_leaf_plan: selections.leaves || "",
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
  const progress = currentStep / totalSteps * 100;
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
  }) => <button type="button" onClick={onClick} className={`w-full cursor-pointer transition-all duration-200 border-2 rounded-3xl bg-card p-5 md:p-7 flex items-start gap-4 md:gap-5 text-left ${selected ? "border-brand bg-[#F9FBE7] shadow-lg" : "border-border hover:border-highlight hover:-translate-y-0.5"}`}>
      <div className={`mt-1 flex-shrink-0 ${iconColor}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-extrabold text-lg md:text-xl text-ink">{title}</div>
        {description && <p className="text-base text-paragraph">{description}</p>}
      </div>
    </button>;
  return <>
      <Helmet>
        <title>Plan Your 2026 Property Roadmap | Amigos Landscaping</title>
        <meta name="description" content="Build your personalized 2026 property care roadmap in under 60 seconds with Amigos Landscaping." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-cloud pt-40 md:pt-48 pb-12 px-4 md:px-8">
        {/* Hidden Netlify Form for detection */}
        <form name="property-plan-2026" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="property-plan-2026" />
          <input type="text" name="city" />
          <input type="text" name="status" />
          <input type="text" name="mowing_plan" />
          <input type="text" name="lawn_health" />
          <input type="text" name="bed_maintenance" />
          <input type="text" name="spring_refresh" />
          <input type="text" name="trimming_plan" />
          <input type="text" name="fall_leaf_plan" />
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
            <p className="text-sm text-paragraph leading-relaxed">It doesn't matter what month it is—plan for a fresh start. We'll adjust the timing for you once we connect.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border-2 border-brand/5 shadow-sm space-y-2">
            <h4 className="font-headline text-lg text-brand flex items-center gap-2">
              <Target className="w-5 h-5 text-highlight" /> Choose Your Ideal
            </h4>
            <p className="text-sm text-paragraph leading-relaxed">Select the services you'd ideally want. We build every roadmap to align with your specific property goals.</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-2xl mx-auto bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50">
          {/* Progress Bar */}
          <div className="bg-brand p-4 text-center relative overflow-hidden">
            <div className={`w-full bg-ink/40 h-1.5 rounded-full overflow-hidden transition-opacity duration-500 ${currentStep === 1 ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-highlight h-full transition-all duration-600 ease-out" style={{
              width: `${progress}%`
            }} />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Welcome */}
              {currentStep === 1 && <motion.div key="step1" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3,
              ease: [0.175, 0.885, 0.32, 1.275]
            }} className="text-center space-y-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-[#F9FBE7] rounded-3xl rotate-6 absolute inset-0" />
                    <div className="w-20 h-20 bg-card border-2 border-brand rounded-3xl flex items-center justify-center relative z-10 -rotate-3">
                      <Map className="w-10 h-10 text-brand" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-headline text-3xl text-ink">Ready to see how we can help?</h2>
                    <p className="text-paragraph text-lg max-w-xs mx-auto leading-relaxed">Build your roadmap in under 60 seconds and see our suggestions for your property.</p>
                  </div>
                  <button type="button" onClick={nextStep} className="btn-primary w-full py-5 rounded-2xl shadow-xl text-xl">
                    Start My Plan
                  </button>
                </motion.div>}

              {/* Step 2: Location */}
              {currentStep === 2 && <motion.div key="step2" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">Where's the home located?</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg">We're your helpful neighborhood team serving these core local areas.</p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.propertyCity === "Wheaton"} onClick={() => selectOption("propertyCity", "Wheaton")} icon={MapPin} title="Wheaton" />
                    <OptionCard selected={selections.propertyCity === "Glen Ellyn"} onClick={() => selectOption("propertyCity", "Glen Ellyn")} icon={MapPin} title="Glen Ellyn" />
                    <OptionCard selected={selections.propertyCity === "Winfield"} onClick={() => selectOption("propertyCity", "Winfield")} icon={MapPin} title="Winfield" />
                    <OptionCard selected={selections.propertyCity === "Other area"} onClick={() => selectOption("propertyCity", "Other area")} icon={Compass} iconColor="text-structure" title="Other nearby area" description="I'm in a nearby surrounding city." />
                  </div>
                </motion.div>}

              {/* Step 3: Status */}
              {currentStep === 3 && <motion.div key="step3" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">Current Service Status</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg">Are you a current customer or are you looking for a new team for your property?</p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.status === "Already a customer"} onClick={() => selectOption("status", "Already a customer")} icon={Heart} title="I'm already a customer" />
                    <OptionCard selected={selections.status === "First time hiring a pro"} onClick={() => selectOption("status", "First time hiring a pro")} icon={UserPlus} title="First time hiring a pro" />
                    <OptionCard selected={selections.status === "Looking to switch"} onClick={() => selectOption("status", "Looking to switch")} icon={RefreshCw} title="Looking to switch teams" />
                  </div>
                </motion.div>}

              {/* Step 4: Mowing */}
              {currentStep === 4 && <motion.div key="step4" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Scissors className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">I. Weekly Maintenance</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg leading-relaxed">
                    Weekly mowing and professional string trimming are included. <strong>How should we handle the clippings?</strong>
                  </p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.clippings === "The Nutrient Standard"} onClick={() => selectOption("clippings", "The Nutrient Standard", 5)} icon={Leaf} title="The Nutrient Standard (Recommended)" description="We mulch (shred) the clippings back into the lawn to act as a natural fertilizer for your soil." />
                    <OptionCard selected={selections.clippings === "The Pristine Standard"} onClick={() => selectOption("clippings", "The Pristine Standard", 2)} icon={Package} title="The Pristine Standard" description="We bag and haul away all clippings for a 100% clear surface every week." />
                  </div>
                </motion.div>}

              {/* Step 5: Lawn Health */}
              {currentStep === 5 && <motion.div key="step5" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">II. Lawn Health</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg font-bold leading-relaxed">Who is handling the aeration and seasonal thickness of your grass?</p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.lawnHealth === "Homeowner Managed"} onClick={() => selectOption("lawnHealth", "Homeowner Managed", 2)} icon={User} iconColor="text-structure" title="I'll handle this" description="I will manage my own aeration, seeding, and treatment schedule." />
                    <OptionCard selected={selections.lawnHealth === "The Essential Refresh"} onClick={() => selectOption("lawnHealth", "The Essential Refresh", 15)} icon={Sprout} title="The Essential Refresh" description="Amigos handles professional Core Aeration and Overseeding in the Spring. Recommended to maintain density." />
                    <OptionCard selected={selections.lawnHealth === "The Elite Standard"} onClick={() => selectOption("lawnHealth", "The Elite Standard", 20)} icon={Award} title="The Elite Standard" description="Two professional aeration/seeding visits per year (Spring & Fall) for maximum density." />
                  </div>

                  <div className="mt-6 p-5 bg-cloud rounded-2xl border-2 border-dashed border-structure/30">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input type="checkbox" checked={fertilizerSync} onChange={e => setFertilizerSync(e.target.checked)} className="w-6 h-6 accent-brand cursor-pointer" />
                      <span className="text-base text-ink font-bold">
                        Fertilizer Sync? 
                        <span className="block font-normal text-sm text-paragraph mt-1">Yes, I'd like Amigos to coordinate with your licensed partner to sync treatments with mowing.</span>
                      </span>
                    </label>
                  </div>
                </motion.div>}

              {/* Step 6: Garden Beds */}
              {currentStep === 6 && <motion.div key="step6" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Flower2 className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">III. Garden Beds</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg font-bold">Who handles keeping the garden beds clear of weeds throughout the year?</p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.beds === "Homeowner Managed"} onClick={() => selectOption("beds", "Homeowner Managed", 2)} icon={User} iconColor="text-structure" title="I'll handle this" description="I will handle my own weeding throughout the season." />
                    <OptionCard selected={selections.beds === "The Clean Look Plan"} onClick={() => selectOption("beds", "The Clean Look Plan", 10)} icon={Zap} title='The "Clean Look" Plan' description="A visual-first approach. We use string trimmers weekly to keep weeds at bay and ensure a clean transition." />
                    <OptionCard selected={selections.beds === "The Estate Detail Plan"} onClick={() => selectOption("beds", "The Estate Detail Plan", 20)} icon={Sparkles} title='The "Estate Detail" Plan' description="Our most thorough care. We hand-pull weeds from the root every week for a pristine bed surface." />
                  </div>
                </motion.div>}

              {/* Step 7: Spring Refresh */}
              {currentStep === 7 && <motion.div key="step7" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">IV. Spring Reset</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg leading-relaxed font-bold text-center">Should Amigos perform a professional "Spring Refresh" in April?</p>
                  
                  <div className="p-6 bg-[#F9FBE7] border-2 border-brand/10 rounded-2xl mb-8 text-base text-brand font-bold text-center leading-relaxed">
                    Includes: Seasonal Debris Cleanup + Deep Spade Edging + Mulch Installation + Weed Preventer
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="button" onClick={() => selectOption("refresh", "Perform Full Refresh", 10)} className={`cursor-pointer transition-all duration-200 border-2 rounded-3xl bg-card p-6 flex flex-col items-center justify-center gap-2 text-center ${selections.refresh === "Perform Full Refresh" ? "border-brand bg-[#F9FBE7] shadow-lg" : "border-border hover:border-highlight hover:-translate-y-0.5"}`}>
                      <CheckCircle className="w-10 h-10 text-brand mb-2" />
                      <div className="font-extrabold text-xl text-ink">Yes</div>
                    </button>
                    <button type="button" onClick={() => selectOption("refresh", "Homeowner Managed", 2)} className={`cursor-pointer transition-all duration-200 border-2 rounded-3xl bg-card p-6 flex flex-col items-center justify-center gap-2 text-center ${selections.refresh === "Homeowner Managed" ? "border-brand bg-[#F9FBE7] shadow-lg" : "border-border hover:border-highlight hover:-translate-y-0.5"}`}>
                      <User className="w-10 h-10 text-structure mb-2" />
                      <div className="font-extrabold text-xl text-ink">No, I'll handle this.</div>
                    </button>
                  </div>
                </motion.div>}

              {/* Step 8: Trimming & Pruning */}
              {currentStep === 8 && <motion.div key="step8" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Brush className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">V. Trimming & Pruning</h2>
                  </div>
                  <p className="text-paragraph mb-8 text-base md:text-lg font-bold">How should we handle the professional shaping of your ornamental landscape?</p>
                  
                  <div className="space-y-4">
                    <OptionCard selected={selections.bushes === "Homeowner Managed"} onClick={() => selectOption("bushes", "Homeowner Managed", 2)} icon={User} iconColor="text-structure" title="I'll handle this" description="I will prune and shape my own bushes." />
                    <OptionCard selected={selections.bushes === "Annual Shaping"} onClick={() => selectOption("bushes", "Annual Shaping", 10)} icon={Scissors} title="Annual Shaping (1 visit/yr)" description="One professional visit per season to keep things neat." />
                    <OptionCard selected={selections.bushes === "Premium Managed Shaping"} onClick={() => selectOption("bushes", "Premium Managed Shaping", 20)} icon={Sparkles} title="Premium Managed Support" description="We monitor your bushes and shape them whenever they look shaggy." />
                  </div>
                  
                  <p className="mt-4 text-xs text-structure italic font-bold uppercase tracking-wide">Scope: Covers small to medium bushes and low-hanging branches.</p>

                  <div className="mt-6 p-5 bg-cloud rounded-2xl border-2 border-dashed border-structure/30">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input type="checkbox" checked={perennialPruning} onChange={e => setPerennialPruning(e.target.checked)} className="w-6 h-6 accent-brand cursor-pointer" />
                      <span className="text-base text-ink font-bold">
                        Flower Care & Pruning? 
                        <span className="block font-normal text-sm text-paragraph mt-1">Yes, I'd like Amigos to handle the professional pruning and cutting back of my perennial flowers.</span>
                      </span>
                    </label>
                  </div>
                </motion.div>}

              {/* Step 9: Fall Leaves */}
              {currentStep === 9 && <motion.div key="step9" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Wind className="w-7 h-7 text-highlight flex-shrink-0" />
                    <h2 className="font-headline text-2xl md:text-3xl text-ink">VI. Fall Leaves</h2>
                  </div>
                  <p className="text-paragraph mb-6 text-base md:text-lg leading-relaxed font-bold">When the leaves fall, what's the plan?</p>
                  
                  <div className="space-y-3">
                    <OptionCard selected={selections.leaves === "Homeowner Managed"} onClick={() => selectOption("leaves", "Homeowner Managed", 2)} icon={User} iconColor="text-structure" title="I'll handle this" description="I'll rake and bag my own leaves this fall." />
                    <OptionCard selected={selections.leaves === "Eco-Management"} onClick={() => selectOption("leaves", "Eco-Management", 10)} icon={RefreshCw} title="Eco-Management (Tier 1)" description="We mulch (shred) leaves weekly to feed natural nutrients into your soil." />
                    <OptionCard selected={selections.leaves === "Standard (Eco-Plus)"} onClick={() => selectOption("leaves", "Standard (Eco-Plus)", 15)} icon={CheckCheck} title="Standard: The Eco-Plus Tier" description="Weekly shredding for nutrients, plus one deep final property cleanup before winter hits." />
                    <OptionCard selected={selections.leaves === "Pristine Management"} onClick={() => selectOption("leaves", "Pristine Management", 20)} icon={Crown} title="The Elite Tier" description="The gold standard. Property stays 100% leaf-free every single week (Lawn, beds, and walkways)." />
                  </div>
                </motion.div>}

              {/* Step 10: Summary & Contact */}
              {currentStep === 10 && <motion.div key="step10" initial={{
              opacity: 0,
              scale: 0.98,
              y: 10
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} exit={{
              opacity: 0,
              scale: 0.98,
              y: -10
            }} transition={{
              duration: 0.3
            }}>
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
                    
                    <button type="button" onClick={editPlan} className="mt-6 text-structure font-bold hover:text-brand flex items-center justify-center gap-2 mx-auto text-sm uppercase tracking-widest transition">
                      <Edit2 className="w-4 h-4" /> Edit Selections
                    </button>
                  </div>

                  <p className="text-paragraph mb-8 text-center text-base leading-relaxed font-medium">Provide your contact details below to review your personalized 2026 roadmap and see our suggestions for your property.</p>

                  <div className="space-y-4 mb-8">
                    <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                }))} className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand" />
                    <input type="text" placeholder="Property Address" required value={formData.address} onChange={e => setFormData(prev => ({
                  ...prev,
                  address: e.target.value
                }))} className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))} className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand" />
                      <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} className="w-full p-5 border-2 border-border rounded-2xl outline-none text-base transition-colors focus:border-brand" />
                    </div>
                  </div>

                  <div className="bg-cloud rounded-2xl p-6 md:p-8 border border-structure/20 mb-8">
                    <h3 className="text-[10px] md:text-xs font-extrabold text-brand uppercase tracking-[0.3em] mb-4">Selected Roadmap Summary</h3>
                    <ul className="space-y-3 text-base md:text-lg font-bold text-ink">
                      <li><span className="text-highlight mr-2">★</span>City: {selections.propertyCity}</li>
                      <li><span className="text-highlight mr-2">★</span>Status: {selections.status}</li>
                      <li><span className="text-highlight mr-2">★</span>Mowing: {selections.clippings}</li>
                      <li><span className="text-highlight mr-2">★</span>Lawn Health: {selections.lawnHealth}</li>
                      <li><span className="text-highlight mr-2">★</span>Garden Beds: {selections.beds}</li>
                      <li><span className="text-highlight mr-2">★</span>Spring Refresh: {selections.refresh}</li>
                      <li><span className="text-highlight mr-2">★</span>Bush Care: {selections.bushes}</li>
                      <li><span className="text-highlight mr-2">★</span>Fall Leaves: {selections.leaves}</li>
                      {fertilizerSync && <li><span className="text-highlight mr-2">★</span>Chemical Coordination sync requested</li>}
                      {perennialPruning && <li><span className="text-highlight mr-2">★</span>Perennial Pruning sync requested</li>}
                    </ul>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl text-xl disabled:opacity-70">
                    {isSubmitting ? <>
                        <Loader2 className="w-7 h-7 animate-spin" /> Sending Plan...
                      </> : <>
                        <Send className="w-7 h-7" /> Request My Property Plan Review
                      </>}
                  </button>
                </motion.div>}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep > 1 && currentStep < 10 && <div className="mt-8 md:mt-12 flex justify-between items-center">
                <button type="button" onClick={prevStep} className="text-structure font-bold hover:text-ink px-6 py-2 transition text-xl">
                  Back
                </button>
                <button type="button" onClick={nextStep} className={`btn-primary px-12 md:px-16 py-4 md:py-5 rounded-2xl shadow-xl text-lg md:text-xl ${shakeNext ? 'animate-shake' : ''}`}>
                  {currentStep === 9 ? "Review My Profile" : "Next Step"}
                </button>
              </div>}
          </form>
        </div>
      </main>

      <Footer />
    </>;
};
export default Plan;