import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Photography } from './pages/Photography';
import { photos } from './data/photos';
import { useHashRoute } from './useHashRoute';

const pages = [
  { id: 'about', label: 'About', title: 'Ryan Mahshie | Backend Engineer', Page: About },
  { id: 'experience', label: 'Experience', title: 'Experience | Ryan Mahshie', Page: Experience },
  { id: 'projects', label: 'Projects', title: 'Projects | Ryan Mahshie', Page: Projects },
  ...(photos.length > 0
    ? [{ id: 'photography', label: 'Photography', title: 'Photography | Ryan Mahshie', Page: Photography }]
    : []),
];

function App() {
  const route = useHashRoute(pages.map((p) => p.id), 'about');
  const { id, title, Page } = pages.find((p) => p.id === route);

  useEffect(() => {
    document.title = title;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="app" data-page={id}>
      <Header pages={pages} current={id} />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  );
}

export default App;
