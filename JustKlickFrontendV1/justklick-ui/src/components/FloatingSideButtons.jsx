import { HelpCircle, GitCompare, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingSideButtons() {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Need Guidance",
      icon: HelpCircle,
      bg: "bg-orange-500 hover:bg-orange-600",
      path: "/contact",
      height: "h-[126px]",
    },
    {
      label: "Compare Options",
      icon: GitCompare,
      bg: "bg-blue-600 hover:bg-blue-700",
      path: "/compare",
      height: "h-[142px]",
    },
    {
      label: "My Enquiries",
      icon: ClipboardList,
      bg: "bg-purple-600 hover:bg-purple-700",
      path: "/profile#enquiries",
      height: "h-[122px]",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);

    if (path.includes("#")) {
      setTimeout(() => {
        const id = path.split("#")[1];
        const section = document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 z-[999] hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {buttons.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={() => handleNavigate(item.path)}
            className={`${item.height} w-[44px] overflow-hidden rounded-l-xl ${item.bg} shadow-xl transition-all duration-300 hover:w-[54px] active:scale-95`}
            title={item.label}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="-rotate-90 flex items-center gap-2 whitespace-nowrap">
                <Icon size={16} className="text-white" />
                <span className="text-sm font-bold text-white">
                  {item.label}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}