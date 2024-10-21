import Link from "next/link";
import Button from "@src/components/Button";
import TotalSavingSvg from "@src/components/Svg/TotalSavingSvg";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDataFromAPI } from "@src/services/getAllServices";
import { AuthContext } from "./_app";

const Login = () => {
    const { setShowAlert } = useContext(AuthContext) as any;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isEye, setIsEye] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async () => {
        setIsLoading(true);
        const response = await getDataFromAPI("post", `api/login`, formData);
        setIsLoading(false);
        setShowAlert({ title: response.message, status: response.status, isOpen: true })
        if (response?.status) {
            localStorage.setItem("login-user", JSON.stringify(response?.data))
            router.push("/");
        }
    }
    return (
        <div className="bg-white flex flex-col items-center h-screen justify-center md:px-0 px-3">
            <div className="md:w-[450px] flex flex-col border border-gray-3 rounded-md shadow-md md:px-10 px-5 py-10 gap-y-2">
                <div className="flex flex-col items-center gap-y-2">
                    <TotalSavingSvg />
                    <div className="flex flex-col items-center gap-y-3">
                        <span className="text-xl font-medium Capitalize text-dark">
                            Sign In
                        </span>
                        <span className="text-[##202124] font-normal text-base">
                            to continue to  <span className="text-primary font-bold"> FinTrack </span>
                        </span>
                    </div>
                    <input
                        type="email"
                        id="email"
                        className="w-full h-[50px] bg-gray-50 ring-1 ring-gray-300 text-gray-900 text-sm rounded outline-none ring-primary focus:ring-2 p-2.5 focus:transition-all focus:duration-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-500"
                        placeholder="Email"
                        required
                        onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                        }
                        value={formData.email}
                    />
                    <div className="relative w-full bg-red-50">
                        <input
                            type={!isEye ? "password" :"text"}
                            id="password"
                            className="w-full h-[50px] bg-gray-50 ring-1 ring-gray-300 text-gray-900 text-sm rounded outline-none focus:ring-primary focus:ring-2 p-2.5 focus:transition-all focus:duration-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-500 pr-12"
                            placeholder="Password"
                            required
                            onChange={(event) =>
                            setFormData({ ...formData, password: event.target.value })
                            }
                            value={formData.password}
                        />
                        <p className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer" onClick={()=>setIsEye(!isEye)}>
                            <img src={`/images/icon/${!isEye?"eye.svg":"eye-close.svg"}`} className="h-6 w-6"/>
                        </p>
                    </div>

                    
                </div>
                <div>
                    <span className="text-primary text-sm font-semibold cursor-pointer hover:text-blue-800 transition-all duration-500">
                        Forgot email?
                    </span>
                </div>
                <div className="mt-10">
                    <p className="text-[#5f6368] text-sm sm:whitespace-nowrap">
                        Not your computer? Use Guest mode to sign in privately.
                    </p>
                    <span className="text-primary text-sm font-semibold cursor-pointer hover:text-blue-800 transition-all duration-500">
                        Learn more
                    </span>
                </div>
                <div className="flex justify-between items-center mt-5">
                    <Link href="/register">
                        <span className="text-sm text-primary font-medium cursor-pointer hover:text-blue-800 transition-all duration-500">
                            Create account
                        </span>
                    </Link>

                    <Button
                        label={"Sign In"}
                        type={"submit"}
                        className="text-white w-[80px] h-[38px] font-medium bg-primary rounded text-sm hover:bg-blue-700 transition-all duration-500 flex items-center justify-center"
                        loading={isLoading}
                        handleClick={handleLogin}
                    />
                </div>
            </div>
        </div>
    );
}
export default Login;
