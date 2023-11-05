import GalleryWrapper from "./components/Gallery/GalleryWrapper";
import GalleryContextProvider from "./context/GalleryContext";

const App = () => {
  return (
    <div className="bg-slate-50 h-full lg:h-screen flex justify-center items-center p-4">
      <GalleryContextProvider>
        <GalleryWrapper />
      </GalleryContextProvider>
    </div>
  );
};

export default App;
