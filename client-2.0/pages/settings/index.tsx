import Breadcrumb from "@src/components/Breadcrumbs/Breadcrumb";
import People from "@src/components/Setting/People";
import Category from "@src/components/Setting/Category";

export default function Settings() {
    return (
        <>
            <Breadcrumb pageName="Settings" />
            <Category/>
            <People/>
        </>
    )
}