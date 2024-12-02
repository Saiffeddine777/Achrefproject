import { RootState , AppDispatch } from "./Store";
import { useSelector , useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()