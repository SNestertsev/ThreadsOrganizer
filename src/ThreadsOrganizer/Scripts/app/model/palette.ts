import { Observable } from "rxjs/Observable";
import { PaletteItem } from "./palette-item";

export class Palette {
    public Items: Observable<PaletteItem[]> = null;

    constructor(
        public Id: number,
        public Title: string,
        public Description: string,
        public Logo: string) { }
}