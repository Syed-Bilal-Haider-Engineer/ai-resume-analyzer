import type { Resume } from "~/types";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCirle";

function ResumeCard({
  id,
  companyName,
  jobTitle,
  feedback: fead,
  imagePath,
}: Resume) {
  console.log("ResumeCard render", { id, companyName, jobTitle, fead, imagePath });
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in-50 slide-in-from-bottom-10"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="shrink-0">
          <ScoreCircle score={fead.overallScore}></ScoreCircle>
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="h-full w-full">
          <img
            src={imagePath}
            alt="Resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
