import Link from "next/link";
import { useContext, useState } from "react";
// import { authenticateApi } from "../components/services/UserService";
import { useRouter } from "next/router";
import { getDataFromAPI } from "@src/services/getAllServices";
import { AuthContext } from "./_app";
import TotalSavingSvg from "@src/components/Svg/TotalSavingSvg";
// import Toastify from "../components/Toastify/toast";

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
                            to continue to <span className="text-primary font-bold"> ExTrack </span>
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
                    <button
                        className="text-white w-[80px] h-[38px] font-medium bg-primary rounded text-sm hover:bg-blue-700 transition-all duration-500 flex items-center justify-center"
                        onClick={handleRegister}
                    >
                        {isLoading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
