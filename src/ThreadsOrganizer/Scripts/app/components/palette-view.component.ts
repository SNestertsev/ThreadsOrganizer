import {
    Component, OnInit,
    trigger, state, style, transition, animate, keyframes } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SimplePageScrollService } from 'ng2-simple-page-scroll/ng2-simple-page-scroll';

import { AuthService } from "../services/auth.service";
import { PaletteService } from "../services/palette.service";
import { Palette } from "../model/palette";
import { PaletteItem } from "../model/palette-item";

@Component({
    selector: "palette-view",
    templateUrl: "./app/components/palette-view.component.html",
    animations: [
        trigger('threadFound', [
            state('yes', style({
                'border-color': 'transparent',
            })),
            state('no', style({
                'border-color': 'red'
            })),
            transition('yes => no', animate('400ms ease-in-out')),
            transition('no => yes', animate('400ms ease-in-out'))
        ]),
    ]
})
export class PaletteViewComponent implements OnInit {
    palettes: Palette[];
    currentPalette: Palette;
    paletteItems: PaletteItem[];
    searchString: string;
    foundItem: PaletteItem;
    threadFoundFlag: string = 'yes';
    errorMessage: string;

    constructor(
        private authService: AuthService,
        private paletteService: PaletteService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private simplePageScrollService: SimplePageScrollService) { }

    ngOnInit() {
        var s = this.paletteService.getAll();
        s.subscribe(
            palettes => {
                this.palettes = palettes.sort(function (a, b) {
                    var x = a.Title.toLowerCase();
                    var y = b.Title.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                if (this.palettes.length > 0) {
                    this.currentPalette = this.palettes[0];
                    this.getPaletteItems(this.currentPalette.Id);
                }
            },
            error => this.errorMessage = <any>error
        );
    }

    onChangePalette(palette) {
        this.currentPalette = palette;
        console.log("onChangePalette: " + palette.Title);
        this.getPaletteItems(palette.Id);
        this.foundItem = null;
        this.searchString = null;
        this.threadFoundFlag = 'yes';
    }

    getPaletteItems(paletteId: number) {
        this.paletteItems = null;
        this.paletteService.get(paletteId).subscribe(
            palette => {
                palette.Items.subscribe(
                    items => this.paletteItems = items,
                    error => this.errorMessage = <any>error
                );
            },
            error => this.errorMessage = <any>error
        );
    }

    search() {
        //console.log(this.searchString);
        if (this.searchString) {
            for (var i = 0; i < this.paletteItems.length; i++) {
                var item = this.paletteItems[i];
                if (item.Name == this.searchString) {
                    console.info("Found item with Id: " + item.Id);
                    this.simplePageScrollService.scrollToElement("#item" + item.Id, -130);
                    this.foundItem = item;
                    this.threadFoundFlag = 'yes';
                    return;
                }
            }
            this.simplePageScrollService.scrollToElement("#item" + this.paletteItems[0].Id, -200);
            this.foundItem = null;
            this.threadFoundFlag = 'no';
        }
        else {
            this.foundItem = null;
            this.threadFoundFlag = 'yes';
        }
    }
};