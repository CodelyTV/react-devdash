import { Widget } from "./Widget";

export interface WidgetRepository {
	save(widget: Widget): Promise<void>;
}
