import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps{
    params: {
        companionId: string;
    }
}



const CompanionIdPage = async({params}: CompanionIdPageProps) => {
    const resolvedParams = await params; // Await params before accessing properties
    const companion = await prismadb.companion.findUnique({
        where: {
            id: resolvedParams.companionId
        },
    });

    const categories = await prismadb.category.findMany();
    return (
        <CompanionForm
        initialData={companion}
        categories={categories}
        />
    )
}

export default CompanionIdPage;