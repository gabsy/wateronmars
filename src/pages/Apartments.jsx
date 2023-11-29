import ApartmentsList from "../components/ApartmentsList"
import PageContainer from "../components/PageContainer"

const Apartments = () => {
	return (
       <PageContainer title="Apartments">
			<p className="mt-5 mb-12">The list of all apartments from the Marte 30, Sanpetru location condominium.</p>
            <ApartmentsList />
        </PageContainer>
    )
}

export default Apartments
