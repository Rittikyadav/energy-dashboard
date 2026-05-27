function DashboardCards({

    plantCapacity,

    todayGeneration,

    totalGeneration,

    irradiance

}) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {/* PLANT CAPACITY */}

            <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 p-8 overflow-hidden relative hover:scale-[1.02] transition-all duration-500">

                {/* GLOW */}

                <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-40"></div>

                <div className="relative z-10">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-gray-500 text-lg font-semibold">

                                Installed Plant Capacity

                            </h3>

                            <p className="text-5xl font-black mt-5 text-gray-800 tracking-tight">

                                {plantCapacity}

                            </p>

                            <p className="text-green-600 font-bold mt-2 text-lg">

                                kWp

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                            <div className="w-8 h-8 rounded-full border-[6px] border-green-500"></div>

                        </div>

                    </div>

                </div>

            </div>

            {/* TODAY GENERATION */}

            <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 p-8 overflow-hidden relative hover:scale-[1.02] transition-all duration-500">

                {/* GLOW */}

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

                <div className="relative z-10">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-gray-500 text-lg font-semibold">

                                Today's Generation

                            </h3>

                            <p className="text-5xl font-black mt-5 text-blue-600 tracking-tight">

                                {todayGeneration}

                            </p>

                            <p className="text-blue-500 font-bold mt-2 text-lg">

                                kWh

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <div className="w-8 h-8 bg-blue-500 rounded-xl animate-pulse"></div>

                        </div>

                    </div>

                </div>

            </div>

            {/* TOTAL GENERATION */}

            <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 p-8 overflow-hidden relative hover:scale-[1.02] transition-all duration-500">

                {/* GLOW */}

                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

                <div className="relative z-10">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-gray-500 text-lg font-semibold">

                                Total Generation

                            </h3>

                            <p className="text-5xl font-black mt-5 text-purple-600 tracking-tight">

                                {totalGeneration}

                            </p>

                            <p className="text-purple-500 font-bold mt-2 text-lg">

                                kWh

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">

                            <div className="w-8 h-8 rounded-full border-[6px] border-purple-500 animate-spin"></div>

                        </div>

                    </div>

                </div>

            </div>

            {/* IRRADIANCE */}

            <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 p-8 overflow-hidden relative hover:scale-[1.02] transition-all duration-500">

                {/* GLOW */}

                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

                <div className="relative z-10">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-gray-500 text-lg font-semibold">

                                Solar Irradiance

                            </h3>

                            <p className="text-5xl font-black mt-5 text-orange-500 tracking-tight">

                                {irradiance}

                            </p>

                            <p className="text-orange-400 font-bold mt-2 text-lg">

                                W/m²

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                            <div className="w-8 h-8 rounded-full bg-orange-400 animate-pulse"></div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default DashboardCards