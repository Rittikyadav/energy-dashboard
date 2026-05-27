function Header() {

    // LIVE TIME

    const now = new Date()

    const time =
        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        })

    const date =
        now.toLocaleDateString([], {

            day: "2-digit",

            month: "long",

            year: "numeric"

        })

    return (

        <>

            {/* HEADER */}

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

                {/* LEFT SECTION */}

                <div className="flex items-center gap-5">

                    {/* COMPANY LOGO */}

                    <div className="bg-white rounded-[28px] shadow-2xl border border-gray-100 p-4 flex items-center justify-center w-24 h-24 overflow-hidden">

                        <img

                            src="/logo.png"

                            alt="Company Logo"

                            className="w-full h-full object-contain"

                        />

                    </div>

                    {/* TITLE */}

                    <div>

                        <h1 className="text-5xl font-black text-gray-800 tracking-tight leading-tight">

                            Smart Energy Meter Dashboard

                        </h1>

                        <p className="text-gray-500 mt-4 text-lg">

                            Real-Time Industrial Solar Monitoring System

                        </p>

                    </div>

                </div>

                {/* RIGHT STATUS SECTION */}

                <div className="flex flex-wrap gap-4">

                    {/* LIVE STATUS */}

                    <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 px-6 py-5 min-w-[230px] hover:scale-[1.02] transition-all duration-500">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-semibold">

                                    System Status

                                </p>

                                <h3 className="text-2xl font-black text-green-600 mt-2">

                                    ACTIVE

                                </h3>

                            </div>

                            <div className="relative">

                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>

                                <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>

                            </div>

                        </div>

                    </div>

                    {/* DATE & TIME */}

                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[24px] shadow-2xl px-6 py-5 text-white min-w-[260px] hover:scale-[1.02] transition-all duration-500">

                        <p className="text-green-100 font-semibold">

                            Live System Time

                        </p>

                        <h2 className="text-4xl font-black mt-2 tracking-tight">

                            {time}

                        </h2>

                        <p className="mt-2 text-green-100">

                            {date}

                        </p>

                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div className="mt-16 mb-4">

                <div className="bg-white border border-gray-100 shadow-xl rounded-[24px] px-6 py-5 flex flex-col md:flex-row items-center justify-between">

                    <div>

                        <h3 className="text-xl font-black text-gray-800">

                            Smart Energy Monitoring System

                        </h3>

                        <p className="text-gray-500 mt-1">

                            Industrial Solar SCADA Platform

                        </p>

                    </div>

                    <div className="mt-4 md:mt-0">

                        <p className="text-gray-600 font-semibold">

                            © 2026 Designed & Developed by

                            <span className="text-green-600 font-black">

                                {" "}R YADAV — SDE 1

                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </>

    )
}

export default Header