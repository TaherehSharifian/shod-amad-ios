import { useEffect, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { LatLngTuple } from "leaflet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfileUserLocation from "./ProfileUserLocation";
import DynamicFormBuilder, {
  type FormField,
} from "../../../components/DynamicFormBuilder";
import { useDynamicForm } from "../../../hooks/useDynamicForm";
import { apiUrl } from "../../../services/AuthService";
import { httpService } from "../../../services/httpService";
import { convertToGregorian } from "../../../utils/dateConversions";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [workShifts, setWorkShifts] = useState<
    { label: string; value: string }[]
  >([]);
  const [center, setCenter] = useState<LatLngTuple>([32.6539, 51.666]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileFormFields: FormField[] = [
    {
      title: "firstName",
      label: "نام",
      type: "text",
      required: false,
      notEditable: true,
    },
    {
      title: "lastName",
      label: "نام خانوادگی",
      type: "text",
      required: false,
      notEditable: true,
    },
    {
      title: "nationalCode",
      label: "کد ملی",
      type: "tel",
      required: false,
      placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
      notEditable: true,
    },
    {
      title: "shamsiBirthDate",
      label: "تاریخ تولد",
      type: "date",
      required: false,
    },
    { title: "mobile", label: "موبایل", type: "tel", required: false },
    {
      title: "personnelCode",
      label: "کد پرسنلی",
      type: "number",
      required: false,
    },
    {
      title: "terminalName",
      label: "نام ترمینال",
      type: "text",
      required: false,
      notEditable: true,
    },
    {
      title: "organizationName",
      label: "سازمان",
      type: "text",
      required: false,
    },
    {
      title: "workShiftId",
      label: "شیفت",
      type: "select",
      required: false,
      options: workShifts,
    },
    {
      title: "departmentName",
      label: "بخش",
      type: "text",
      required: false,
      notEditable: true,
    },
    {
      title: "subDepartmentName",
      label: "زیربخش",
      type: "text",
      required: false,
      notEditable: true,
    },
    {
      title: "gender",
      label: "جنسیت",
      type: "select",
      required: false,
      options: [
        { value: "true", label: "آقا" },
        { value: "false", label: "خانم" },
      ],
      notEditable: true,
    },
    {
      title: "disablityStatus",
      label: "وضعیت جسمانی",
      type: "select",
      required: true,
      options: [
        { value: "none", label: "ندارم" },
        { value: "wheelchair", label: "حرکت با ویلچر" },
        { value: "semiDeaf", label: "مشکل شنوایی" },
        { value: "null", label: "سایر" },
      ],
    },
    {
      title: "address_Province",
      label: "استان",
      type: "text",
      required: true,
      notEditable: true,
    },
    {
      title: "address_City",
      label: "شهر",
      type: "text",
      required: true,
      notEditable: true,
    },
    { title: "address", label: "آدرس", type: "textarea", required: true },
    { title: "postalCode", label: "کدپستی", type: "tel", required: false },
  ];

  const { schema } = useDynamicForm(profileFormFields);
  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleLocationChange = (coords: LatLngTuple) => {
    setCenter(coords);
  };

  const onSubmitProfileForm = async (profileData: any) => {
    console.log("Submitting Form...", profileData, center);
    const editData = {
      ...profileData,
      disablityStatus:
        profileData.disablityStatus === "null"
          ? 0
          : profileData.disablityStatus,
      birthDate: convertToGregorian(profileData.shamsiBirthDate),
      address_Latitude: center[0],
      address_Longitude: center[1],
    };

    const updateProfile = await httpService.put(
      `${apiUrl}api/passenger/Panel/UpdateProfile`,
      editData
    );
    console.log(updateProfile);
    if (updateProfile.status === 200 || updateProfile.status === 204) {
      toast.success("پروفایل با موفقت به روز رسانی شد.");
    }
  };
  const fetchUserProfile = async () => {
    setIsLoading(true);
    const profile = await httpService.get(
      `${apiUrl}api/passenger/Panel/GetMyProfile`
    );
    const data = profile.data.data;
    const mappedData = {
      ...data,
      workShiftId: data.workShiftId?.toString(),
      gender: data.genderStr,
      disablityStatus: data.disablityStatus
        ? data.disablityStatus.toString()
        : "null",
    };

    formMethods.reset(mappedData);
    setCenter([data.address_Latitude, data.address_Longitude]);
    setIsLoading(false);
  };
  const fetchWorkShifts = async () => {
    const workShifts = await httpService.get(
      `${apiUrl}api/passenger/WorkShift/GetAllWorkShifts`
    );
    const data = workShifts.data;
    const mapped = data.map((item: any) => ({
      label: item.workShiftName,
      value: item.workShiftId.toString(),
    }));
    setWorkShifts(mapped);
  };
  useEffect(() => {
    fetchUserProfile();
    fetchWorkShifts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isModalOpen ? (
        <ProfileUserLocation
          center={center}
          onLocationChange={handleLocationChange}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <div className="bg-sky-400">
          <div className=" flex-shrink-0 relative">
            <button
              className="absolute top-5 right-5 w-7 h-7 bg-white text-secondary-main border-secondary-main rounded-full transition z-20"
              onClick={() => navigate("/")}
            >
              <ArrowForward fontSize="small" />
            </button>

            <div className="text-white flex flex-col w-full justify-center items-center gap-4 py-6">
              <Typography variant="h5">ویرایش و تکمیل اطلاعات</Typography>
              <Typography variant="caption">
                ویرایش اطلاعات شخصی و موقعیت جغرافیایی
              </Typography>

              {/* <div className="relative -mb-16 z-[1000]">
                <div
                  className="relative border-4 border-secondary-main w-28 h-28 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: "url(/temp.jpg)" }}
                >
                  <i className="absolute -bottom-2 left-0 text-white border-2 border-white bg-secondary-main rounded-full w-7 h-7 flex justify-center items-center z-10">
                    <CameraAlt fontSize="inherit" />
                  </i>
                </div>
              </div> */}
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-t-3xl flex-flex-col flex-1 min-h-[100vh] max-h-[100dvh] overflow-auto">
            {isLoading ? (
              <CircularProgress size="small" className="w-8 mt-32 mx-auto" />
            ) : (
              <form
                autoComplete="off"
                className="flex flex-col h-full mt-8"
                onSubmit={formMethods.handleSubmit(onSubmitProfileForm)}
              >
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="flex flex-col gap-4">
                    <DynamicFormBuilder
                      formFields={profileFormFields}
                      formMethods={formMethods}
                    />
                    <div className="w-full flex flex-col justify-center items-center">
                      <Typography variant="h6" className="mb-3">
                        محل سکونت
                      </Typography>
                      <ProfileUserLocation
                        center={center}
                        onLocationChange={handleLocationChange}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 m-4 mt-0 bg-white">
                  <Button
                    variant="contained"
                    color="warning"
                    type="submit"
                    disableElevation
                    size="large"
                    fullWidth
                    sx={{
                      borderRadius: "16px",
                      py: 1.5,
                    }}
                  >
                    ذخیره اطلاعات
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
