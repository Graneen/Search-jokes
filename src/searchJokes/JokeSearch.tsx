import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const fetchJokes = async (query: string) => {
    const { data } = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
    return data.result;
};

const useQueryParam = () => {
    const { search } = useLocation();
    return new URLSearchParams(search).get('query') || '';
};

const JokeSearch: React.FC = () => {
    const navigate = useNavigate();
    const initialQuery = useQueryParam();
    const [query, setQuery] = useState(initialQuery);
    const [prevQuery, setPrevQuery] = useState('');

    useEffect(() => {
        if (query.length < 4) return;
        navigate(`?query=${query}`);
    }, [query, navigate]);

    const { data: jokes, isFetching } = useQuery(['jokes', query], () => fetchJokes(query),
        {
            enabled: query.length >= 4 && query !== prevQuery,
            onSuccess: () => setPrevQuery(query),
        }
    );

    return (
        <main className="__className_505ce6">
            <section className="Container_container__UCC1o Container_md__q_A3U">
                <div className="SearchJokesWizard_searchJokes__oQ9wI">
                    <input
                    className="SearchJokesWizard_searchJokesInput__xfVc_"
                    type="text"
                    value={query}
                    placeholder="Search jokes..."
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="JokesCount_jokesCount__coFY0">{jokes? `Total count: ${jokes.length}` : ''}</span>
                </div>
                {isFetching && <p>Loading...</p>}
                <ul className="JokesList_jokesList__u89Dn">
                    {jokes?.length === 0 && query.length > 4 ? (
                        <p>No jokes here</p>
                    ) : (
                        jokes?.map((joke: { id: string; url: string | undefined; value: string | undefined; created_at: string }) => (
                            <a key={joke.id} className="JokesCard_jokesCard__dyN5C" href={joke.url} target="_blank">
                                <p className="JokesCard_jokeValue__J50iL max-lines-2">{joke.value}</p>
                                <p className="JokesCard_jokeDetails__d_NOl">
                                    <span>{joke.id}</span>
                                    <span>{joke.created_at}</span>
                                </p>
                            </a>
                        ))
                    )}
                </ul>
            </section>
        </main>
    );
};

export default JokeSearch;