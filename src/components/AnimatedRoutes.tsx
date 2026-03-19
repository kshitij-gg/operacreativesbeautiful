import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Index from "@/pages/Index";
import MoreWork from "@/pages/MoreWork";
import NotFound from "@/pages/NotFound";
import FilmReelTransition from "./FilmReelTransition";

const AnimatedRoutes = () => {
    const location = useLocation();

    // Scroll to top on route change unless handling a specific anchor scroll
    useEffect(() => {
        if (!location.state?.scrollTo) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.state]);

    return (
        <>
            <FilmReelTransition />
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Index />
                        </motion.div>
                    }
                />
                <Route
                    path="/more-work"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <MoreWork />
                        </motion.div>
                    }
                />
                <Route
                    path="*"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <NotFound />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
        </>
    );
};

export default AnimatedRoutes;
