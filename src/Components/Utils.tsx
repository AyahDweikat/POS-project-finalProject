import { CategoryObj } from "./Types";

export const sortFunctionByStrings = (array:CategoryObj[])=>{
        return array.sort((a:CategoryObj, b:CategoryObj)=>{
            const fa = a.category.toLowerCase(), fb = b.category.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
}