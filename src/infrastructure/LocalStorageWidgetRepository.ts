import { Widget } from "../domain/Widget";
import { WidgetRepository } from "../domain/WidgetRepository";

export class LocalStorageWidgetRepository implements WidgetRepository {
	async save(widget: Widget): Promise<void> {
		await Promise.resolve();
	}
}
