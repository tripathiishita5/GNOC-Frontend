import alertHandling from "../Images/AlertHandlingProcess.png";
import p1flowchart from "../Images/P1Flowchart.png";

const AlertHandling = () => (
    <div className="w-full flex flex-col items-center py-6 space-y-10">
        {/* General Alert Handling Flow */}
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#840F59] text-center">
                General Alert Handling Flow
            </h2>
            <div className="flex justify-center w-full">
                <img
                    src={alertHandling}
                    alt="Alert Handling Flow"
                    className="w-[900px] h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>

        {/* P1 Alert Handling Flow */}
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#840F59] text-center">
                P1 & P2 Alert Handling Flow
            </h2>
            <div className="flex justify-center w-full">
                <img
                    src={p1flowchart}
                    alt="P1 Alert Handling Flow"
                    className="w-[900px] h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    </div>
);

export default AlertHandling;
