export class Item {
    constructor(
        public Id: number,
        public Name: string,
        public Color: string,
        public Description: string,
        public PaletteId?: number
    ) { }
}