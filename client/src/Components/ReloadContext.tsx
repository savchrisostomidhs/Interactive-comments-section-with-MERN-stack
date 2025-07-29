import { createContext } from "react";

const ReloadContext = createContext<() => void>(() => { });

export default ReloadContext