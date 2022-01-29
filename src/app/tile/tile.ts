import { LetterStateService } from "../letter-state.service";

export class Tile {
    colour: String = '';
    value: String = '';
    state: String = new LetterStateService().getDefaultState();
}

