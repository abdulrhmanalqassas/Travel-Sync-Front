import { Chip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FaExclamationCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { LuClock3 } from "react-icons/lu";
import { MdFileDownloadDone } from "react-icons/md";

export default function StatusBadge({ status }) {
  const { t } = useTranslation();
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <>
      {status === "pending" ? (
        <Chip
          variant="flat"
          color={"warning"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<LuClock3 className="w-4 h-4" />}
        >
          {t(capitalizedStatus)}
        </Chip>
      ) : status === "canceled" ? (
        <Chip
          variant="flat"
          color={"danger"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<ImCancelCircle className="w-4 h-4" />}
        >
          {t(capitalizedStatus)}
        </Chip>
      ) : status === "action_required" ? (
        <Chip
          variant="flat"
          color={"secondary"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<FaExclamationCircle className="w-4 h-4" />}
        >
          {t(capitalizedStatus)}{" "}
        </Chip>
      ) : (
        <Chip
          variant="flat"
          color={"success"}
          className="rounded-md h-6  px-2 gap-0 text-sm text-center"
          startContent={<MdFileDownloadDone className="w-4 h-4" />}
        >
          {t(capitalizedStatus)}
        </Chip>
      )}
    </>
  );
}
