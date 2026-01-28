// import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
    //   const response = await fetch('http://localhost:8080/events');

    //   if (!response.ok) {
    //     setError('Fetching events failed.');
    //   } else {
    //     const resData = await response.json();
    //     setFetchedEvents(resData.events);
    //   }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
  const {events} = useLoaderData();

//   if (data.isError) {
//     return <p>{data.message}</p>
//   }

//   const events = data.events;

//   return (
//     <EventsList events={events} />
//   );
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading ...</p>}>
        <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
              
    if (!response.ok) {
        // return {isError: true, message: 'Could not fetch events.'};
        throw new Response(JSON.stringify({ message: 'Could not fetch events.'}), {
            status: 500,
        });
        // -- For react-router-dom v6 only, not applicable for v7 --
        // -- Must import json from react-router-dom as well --
        // throw json(
        //     { message: 'Could not fetch events.'},
        //     {
        //         status: 500,
        //     }
        // );
    } else {
        // const resData = await response.json();
        // return resData.events;
        
        // return response;
        const resData = await response.json();
        return resData.events;
    }
}

// "defer" applicable for react-router-dom v6 only, not applicable for v7
// export function loader() {
//     return defer({
//         events: loadEvents()
//     })
// }

// For react-router-dom v7
export async function loader() {
    return {
        events: loadEvents()
    };
}