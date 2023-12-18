import Header from "@src/components/Header";
import Sidebar from "@src/components/Sidebar";
import Loader from "@src/components/Loader";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
                <Loader />
            ) : (
                <div className="flex h-screen overflow-hidden">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </div>
    )
}