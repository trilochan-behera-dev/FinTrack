// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";
import UploadSvg from "@src/components/Svg/UploadSvg";
import Breadcrumb from "@src/components/Breadcrumbs/Breadcrumb";
import Button from "@src/components/Button";

const Profile = () => {
  const { userinfo, setUserinfo, setShowAlert } = useContext(UserContext) as any;
  const [user, setUser] = useState({}) as any;
  const [imageUpdate, setImageUpdate] = useState(false);
  const [photo, setPhoto] = useState() as any;
  const [previewImage, setPreviewImage] = useState(null) as any;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Display the selected image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handleCancel = () => {
    setPreviewImage(null);
    setImageUpdate(false);
  }

  const fetchUserData = async () => {
    const userData = await getDataFromAPI('get', "api/user");
    setUser(userData.data);
  }

  const uploadPhoto = async () => {
    if (previewImage) {
      const formData = new FormData();
      formData.append('photo', photo);
      const response = await getDataFromAPI('post', "api/upload", formData);
      if (response.status) {
        setUser(response.data);
        setImageUpdate(false);
        setPreviewImage(null);
        setUserinfo({ ...userinfo, photo: response.data.photo })
        const localdata = {
          name: response.data?.name,
          email: response.data?.email,
          token: userinfo.token,
          photo: response.data?.photo
        }
        localStorage.setItem('login-user', JSON.stringify(localdata));
      }
      setShowAlert({ title: response.message, status: response.status, isOpen: true })
    } else {
      setShowAlert({ title: "Please select photo to update profile", status: false, isOpen: true })
    }
  }

  const handleSaveProfile = async () => {
    const response = await getDataFromAPI('put', "api/updateuser", user);
    if (response.status) {
      setUser(response?.data);
      setUserinfo({ ...userinfo, email: response.data?.email, name: response.data?.name });
      const localdata = {
        name: response.data?.name,
        email: response.data?.email,
        token: userinfo.token,
        photo: response.data?.photo
      }
      localStorage.setItem('login-user', JSON.stringify(localdata));
    }
    setShowAlert({ title: response.message, status: response.status, isOpen: true })
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                Personal Information
              </div>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-3 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={user?.name}
                      onChange={(e) => setUser({ ...user, name: e?.target?.value })}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-3 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={user?.phone}
                    onChange={(e) => setUser({ ...user, phone: e?.target?.value })}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-3 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    value={user?.email}
                    disabled
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-3 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Username"
                  id="Username"
                  value={user?.username}
                  disabled
                />
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  BIO
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-3 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={6}
                    placeholder="Write your bio here"
                    value={user?.bio}
                    onChange={(e) => setUser({ ...user, bio: e?.target?.value })}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <Button
                  label={"Save"}
                  type={"submit"}
                  color={"bg-primary"}
                  txtcolor="#ffffff"
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                  handleClick={handleSaveProfile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="font-medium text-black dark:text-white">
                Your Profile Image
              </div>
            </div>
            <div className="p-7">

              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-primary bg-opacity-20 text-black dark:text-white flex items-center justify-center uppercase font-bold">
                  {
                    userinfo?.photo ?
                      <img className="object-cover w-full h-full" src={user?.photo} alt="profile" />
                      :
                      userinfo?.name.slice(0, 2)
                  }
                </div>
                <div>
                  <span className="mb-1.5 text-black dark:text-white">
                    Edit your photo
                  </span>
                  <span className="flex gap-2.5">
                    <Button
                      label={imageUpdate ? "Cancel" : "Update"}
                      type={"submit"}
                      color={"bg-primary"}
                      txtcolor="#ffffff"
                      className="text-sm hover:text-primary"
                      handleClick={() => setImageUpdate(!imageUpdate)}
                    />
                  </span>
                </div>
              </div>

              <div
                id="FileUpload"
                className={`relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed ${imageUpdate ? "border-primary" : "border-graydark"}
                   bg-gray py-4 px-4 dark:bg-meta-3 sm:py-7.5`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleFileChange}
                  disabled={!imageUpdate}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <UploadSvg color={imageUpdate ? "#16a7e3" : "#333A48"} />
                  </span>
                  <span className={`${imageUpdate ? "text-primary" : "text-graydark dark:text-white"}`}>Click to upload</span>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>Please click on <span className={`${imageUpdate ? "text-primary" : "text-graydark dark:text-white"}`}> {imageUpdate ? "cancel" : "update"} </span>  to  <span className={`${imageUpdate ? "text-primary" : "text-graydark dark:text-white"}`}> {imageUpdate ? "disable" : "enable"} </span> file choosen.</p>
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <Button
                  label={"Cancel"}
                  type={"submit"}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  handleClick={handleCancel}
                />
                <Button
                  label={"Save"}
                  type={"submit"}
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                  handleClick={uploadPhoto}
                />
              </div>
              {previewImage && <img src={previewImage} alt="Selected Image" className="h-40 w-80 object-contain" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
