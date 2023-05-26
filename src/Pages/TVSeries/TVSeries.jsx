import TVList from "../../components/TVList/TVList";
import { API_MOVIES_URL } from "../../utils/constant";
import useFetch from "../../hooks/useFetch/useFetch";
import Banner from "../../components/Banner/Banner";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Loading from "../../components/Loading/Loading";



const Profile = () => {
    const { data: TV_LIST_POPULAR, isLoading: TVListLoading } = useFetch(API_MOVIES_URL.TV_LIST_POPULAR);
    const { data: TV_LIST_TOP_RATED, isLoading: TVListTopRatedLoading } = useFetch(API_MOVIES_URL.TV_LIST_TOP_RATED);
    const { data: TV_LIST_TRENDING, isLoading: TVListTrendingLoading } = useFetch(API_MOVIES_URL.TV_LIST_TRENDING);
    const { data: DISCOVER_TV, isLoading: discoverTVLoading } = useFetch(API_MOVIES_URL.DISCOVER_TV);
    const isLoading = TVListLoading || TVListTopRatedLoading || TVListTrendingLoading || discoverTVLoading;
    return (
        <div className="home">
            {isLoading ? (
                <>
                    <div className="NetflixIntro"><Loading /></div>
                </>
            ) : (
                <main>
                    <Header />
                    <Banner />
                    <TVList
                        listTitle="Trending TV Series"
                        TVData={TV_LIST_TRENDING.results}
                    />
                    <TVList
                        listTitle="Popular TV Series "
                        TVData={TV_LIST_POPULAR.results}
                    />
                    <TVList
                        listTitle="Top Rated TV Series"
                        TVData={TV_LIST_TOP_RATED.results}
                    />
                    <TVList
                        listTitle="Discover TV Series"
                        TVData={DISCOVER_TV.results}
                    />
                    <Footer />
                </main>
            )
            }
        </div >
    );
}

export default Profile