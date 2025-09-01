import alertHandling from "../Images/AlertHandlingProcess.png";
import p1flowchart from "../Images/P1Flowchart.png";

const AlertHandling = () => (
    <div className="w-full flex flex-col items-center py-6 space-y-10">
        {/* General Alert Handling Flow */}
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                General Alert Handling Flow
            </h2>
            <div className="flex justify-center w-full">
                <img
                    src={alertHandling}
                    alt="Alert Handling Flow"
                    className="w-[900px] h-auto rounded-lg shadow-lg"
                />
            </div>
            <p className="mt-4 text-gray-600 text-center max-w-3xl">
                This flowchart represents the general alert handling process. It
                outlines how alerts are generated, categorized, and routed to the
                appropriate team for resolution. The goal is to ensure a systematic and
                timely response to different types of alerts.
            </p>
        </div>

        {/* P1 Alert Handling Flow */}
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                P1 & P2 Alert Handling Flow
            </h2>
            <div className="flex justify-center w-full">
                <img
                    src={p1flowchart}
                    alt="P1 Alert Handling Flow"
                    className="w-[900px] h-auto rounded-lg shadow-lg"
                />
            </div>
            <p className="mt-4 text-gray-600 text-center max-w-3xl">
                This diagram explains the handling process for Priority 1 (P1) and
                Priority 2 (P2) alerts. These alerts require immediate attention, and
                the workflow ensures that critical issues are escalated quickly and
                resolved efficiently to minimize downtime.
            </p>
        </div>
    </div>
);

export default AlertHandling;
