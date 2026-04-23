import professorMascot from "@/assets/mascot-professor.png";

/**
 * Intro callout that sits above the "How It Works" section on service
 * category pages. Visually frames the content as educational rather than
 * sales-y, with the professor-mode mascot on the side.
 */
const ProfessorCallout = ({
  title = "Let's break this down",
  subtitle = "Class is in session.",
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="bg-callout border-2 border-brand/15 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-6">
      <img
        src={professorMascot}
        alt="Professor Amigo, the Amigos Landscaping mascot"
        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 object-contain"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-headline text-lg md:text-xl text-ink mb-1">
          {title}
        </h3>
        <p className="font-body text-paragraph text-sm md:text-base leading-snug">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProfessorCallout;
