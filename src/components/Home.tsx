import { Credentails } from "./Credentials";

export function Home() {
        return (
        <div className="lg:flex font-mono">
            <div className="lg:w-2/5  bg-green-200 p-8 space-y-8 flex-cols justify-center items-center  ">
                <div className="font-bold  text-3xl lg:text-4xl text-blue-900">DNS Manager Hub</div>

                <div className="space-y-2">
                    <div className=" text-4xl lg:text-5xl max-w-[450px]">
                        Get total control over your DNS records.
                    </div>
                    <div className="text-xl lg:text-2xl max-w-[500px]">
                        DNS Manager Hub provides a comprehensive
                        interface for effortless management of DNS
                        records on AWS Route 53.
                    </div>
                </div>
                <div className="space-y-2 text-lg ">
                    <h3 className="font-semibold">DNS Manager Hub prioritizes security, offering:</h3>
                    <ul className="list-disc ms-6">
                        <li>Advanced Dashboard with Real-time Analytics</li>
                        <li>Intuitive DNS Record Configuration Interface</li>
                        <li>Seamless AWS Route 53 Integration</li>
                        <li>Robust Multi-factor Authentication and Authorization Mechanisms</li>
                    </ul>
                </div>
                

            </div>
            <div className="lg:w-3/5">
                <div className="flex flex-col lg:h-screen justify-center items-center">
                    <Credentails />
                </div>

            </div>
        </div>
    );
}
