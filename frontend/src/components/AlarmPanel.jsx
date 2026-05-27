function AlarmPanel({ liveData }) {

    const alarms = []

    // SAFE VALUE PARSER

    const safeValue = (value) =>

        Number(parseFloat(value || 0))

    // VALUES

    const vr = safeValue(liveData?.REG1)

    const vy = safeValue(liveData?.REG3)

    const vb = safeValue(liveData?.REG5)

    const ir = safeValue(liveData?.REG17)

    const iy = safeValue(liveData?.REG19)

    const ib = safeValue(liveData?.REG21)

    const freq = safeValue(liveData?.REG57)

    // VOLTAGE CHECK

    if (liveData) {

        if (vr > 250) {

            alarms.push(

                "High Voltage on R Phase"

            )

        }

        if (vr < 180) {

            alarms.push(

                "Low Voltage on R Phase"

            )

        }

        if (vy > 250) {

            alarms.push(

                "High Voltage on Y Phase"

            )

        }

        if (vy < 180) {

            alarms.push(

                "Low Voltage on Y Phase"

            )

        }

        if (vb > 250) {

            alarms.push(

                "High Voltage on B Phase"

            )

        }

        if (vb < 180) {

            alarms.push(

                "Low Voltage on B Phase"

            )

        }

        // CURRENT CHECK

        if (ir > 150) {

            alarms.push(

                "High Current on R Phase"

            )

        }

        if (iy > 150) {

            alarms.push(

                "High Current on Y Phase"

            )

        }

        if (ib > 150) {

            alarms.push(

                "High Current on B Phase"

            )

        }

        // FREQUENCY CHECK

        if (freq < 45) {

            alarms.push(

                "Low Frequency Detected"

            )

        }

        if (freq > 55) {

            alarms.push(

                "High Frequency Detected"

            )

        }

    }

    return (

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 mb-10 overflow-hidden transition-all duration-500">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">

                        System Alarm Panel

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Real-time industrial fault monitoring

                    </p>

                </div>

                {/* STATUS */}

                <div className={`px-5 py-2 rounded-full font-bold text-sm shadow-md

                    ${alarms.length === 0

                        ? "bg-green-100 text-green-700"

                        : "bg-red-100 text-red-700"

                    }

                `}>

                    {alarms.length === 0

                        ? "System Healthy"

                        : `${alarms.length} Active Alarm${alarms.length > 1 ? "s" : ""}`}

                </div>

            </div>

            {/* ALARM CONTENT */}

            {alarms.length === 0 ? (

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-[28px] p-8 flex items-center justify-between shadow-inner">

                    <div>

                        <h3 className="text-3xl font-black text-green-700">

                            No Active Alarms

                        </h3>

                        <p className="text-green-600 mt-2">

                            All electrical parameters are operating normally

                        </p>

                    </div>

                    {/* ANIMATED STATUS */}

                    <div className="relative">

                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>

                        <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-75"></div>

                    </div>

                </div>

            ) : (

                <div className="space-y-5">

                    {alarms.map((alarm, index) => (

                        <div

                            key={index}

                            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-[24px] p-6 shadow-md hover:scale-[1.01] transition-all duration-300"

                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-2xl font-black text-red-700">

                                        Warning Alert

                                    </h3>

                                    <p className="text-red-600 mt-2 text-lg font-semibold">

                                        {alarm}

                                    </p>

                                </div>

                                {/* ALERT DOT */}

                                <div className="relative">

                                    <div className="w-5 h-5 bg-red-500 rounded-full"></div>

                                    <div className="absolute inset-0 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-75"></div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    )
}

export default AlarmPanel