import MovieList from "../../components/MovieList/MovieList";
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
                    <MovieList
                        listTitle="Trending TV Series"
                        movieData={TV_LIST_TRENDING.results}
                    />
                    <MovieList
                        listTitle="Popular TV Series "
                        movieData={TV_LIST_POPULAR.results}
                    />
                    <MovieList
                        listTitle="Top Rated TV Series"
                        movieData={TV_LIST_TOP_RATED.results}
                    />
                    <MovieList
                        listTitle="Discover TV Series"
                        movieData={DISCOVER_TV.results}
                    />
                    <Footer />
                </main>
            )
            }
        </div >
    );
}

export default Profile