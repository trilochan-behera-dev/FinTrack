import Link from "next/link";
import Button from "@src/components/Button";
import TotalSavingSvg from "@src/components/Svg/TotalSavingSvg";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromAPI } from "@src/services/getAllServices";
import { AuthContext } from "./_app";

const Register = () => {
    const { setShowAlert } = useContext(AuthContext) as any;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleRegister = async () => {
        setIsLoading(true);
        const response = await getDataFromAPI("post", `api/register`, formData);
        setIsLoading(false);
        setShowAlert({ title: response.message, status: response.status, isOpen: true })
        if (response?.status) {
            router.push("/login");
        }
    };
    return (
        <div className="bg-white flex flex-col items-center h-screen justify-center md:px-0 px-3">
            <div className="md:w-[450px] flex flex-col border border-gray-3 rounded-md shadow-md md:px-10 px-5 py-10 gap-y-2">
                <div className="flex flex-col items-center gap-y-2">
                    <TotalSavingSvg />
                    <div className="flex flex-col items-center gap-y-3">
                        <span className="text-xl font-medium Capitalize text-dark">
                            Sign Up
                        </span>
                        <span className="text-currentcolor font-normal text-base">
                            to continue to <span className="text-primary font-bold"> FinTrack </span>
                        </span>
                    </div>
                    <input
                        onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                        }
                        value={formData.name}
                        type="text"
                        id="name"
                        className="w-full h-[50px] bg-gray-50 ring-1 ring-border-gray-3 text-gray-900 text-sm rounded outline-none focus:ring-primary focus:ring-2 p-2.5 focus:transition-all focus:duration-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-500"
                        placeholder="Name"
                    />
                    <input
                        onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                        }
                        value={formData.email}
                        type="email"
                        id="email"
                        className="w-full h-[50px] bg-gray-50 ring-1 ring-gray-300 text-gray-900 text-sm rounded outline-none focus:ring-primary focus:ring-2 p-2.5 focus:transition-all focus:duration-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-500"
                        placeholder="Email"
                    />
                    <input
                        onChange={(event) =>
                            setFormData({ ...formData, password: event.target.value })
                        }
                        value={formData.password}
                        type="password"
                        id="password"
                        className="w-full h-[50px] bg-gray-50 ring-1 ring-gray-300 text-gray-900 text-sm rounded outline-none focus:ring-primary focus:ring-2 p-2.5 focus:transition-all focus:duration-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-500"
                        placeholder="Password"
                    />
                </div>
                <div className="mt-10">
                    <p className="text-[#5f6368] text-sm md:whitespace-nowrap">
                        Not your computer? Use Guest mode to sign in privately.
                    </p>
                    <span className="text-primary text-sm font-semibold cursor-pointer hover:text-blue-800 transition-all duration-500">
                        Learn more
                    </span>
                </div>
                <div className="flex justify-between items-center mt-5">
                    <Link href="/login">
                        <span className="text-sm text-primary font-medium cursor-pointer hover:text-blue-800 transition-all duration-500">
                            Already have an account?
                        </span>
                    </Link>

                    <Button
                        label={"Sign Up"}
                        type={"submit"}
                        className="text-white w-[80px] h-[38px] font-medium bg-primary rounded text-sm hover:bg-blue-700 transition-all duration-500 flex items-center justify-center"
                        loading={isLoading}
                        handleClick={handleRegister}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
