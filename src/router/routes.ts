import { nanoid } from "nanoid";
import { Home } from "../pages/home/home";
import { Movie } from "../pages/movie/movie";
import { TVShows } from "../pages/tv-shows/tv-shows";
import { People } from "../pages/people/people";
import { NowPlaying } from "../pages/now-playing/now-playing";
import { Upcoming } from "../pages/upcoming/upcoming";
import { TopRated } from "../pages/top-rated/top-rated";
import { AiringToday } from "../pages/airing-today/airing-today";
import { OnTv } from "../pages/on-tv/on-tv";
import { TvTopRated } from "../pages/tv-top-rated/tv-top-rated";
import { MovieDetail } from "../pages/movie-detail/movie-detail";

export const routes = [
    {
        id: nanoid(),
        component: Home
    },
    {
        id: nanoid(),
        component: Movie,
        path: '/movie'
    },
    {
        id: nanoid(),
        component: MovieDetail,
        path: '/movie/:id'
    },
    {
        id: nanoid(),
        component: TVShows,
        path: '/tv'
    },
    {
        id: nanoid(),
        component: People,
        path: '/person'
    },
    {
        id: nanoid(),
        component: NowPlaying,
        path: '/movie/now-playing'
    },
    {
        id: nanoid(),
        component: Upcoming,
        path: '/movie/upcoming'
    },
    {
        id: nanoid(),
        component: TopRated,
        path: '/movie/top-rated'
    },
    {
        id: nanoid(),
        component: AiringToday,
        path: '/tv/airing-today'
    },
    {
        id: nanoid(),
        component: OnTv,
        path: '/tv/on-tv'
    },
    {
        id: nanoid(),
        component: TvTopRated,
        path: '/tv/top-rated'
    }
]