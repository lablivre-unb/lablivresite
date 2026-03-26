from mkdocs.plugins import BasePlugin
from mkdocs.config import config_options
from datetime import datetime
import locale

class PublicationsPlugin(BasePlugin):
    config_scheme = (
        ('collections', config_options.Type(list, default=[])),
    )

    def on_page_context(self, context, page, config, nav):
        # Read collections from mkdocs.yml plugin config
        collections_config = self.config.get('collections', [])
        
        # Fallback to the default LabLivre structure if no config is provided
        # This keeps compatibility with the current setup out of the box!
        if not collections_config:
            collections_config = [
                {'name': 'publications', 'path': 'publications/', 'format_date': True},
                {'name': 'projects', 'path': 'projects/', 'exclude': ['gsoc-projects/']},
                {'name': 'capacitacao', 'path': 'capacitacao/'},
                {'name': 'treinamentos', 'path': 'treinamentos/'}
            ]

        # Initialize the variables in context
        for col_conf in collections_config:
            name = col_conf['name']
            context[name] = []

        pt_months = {
            1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril',
            5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto',
            9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
        }

        # Scan all pages
        for item in nav.pages:
            for col_conf in collections_config:
                name = col_conf['name']
                path = col_conf['path']
                excludes = col_conf.get('exclude', [])
                format_date = col_conf.get('format_date', False)

                # Check if the path matches and is not excluded
                if path in item.url:
                    if any(exclude in item.url for exclude in excludes):
                        continue
                    
                    data = item.meta.copy() if item.meta else {}
                    data['url'] = item.url
                    # Fallback title if not provided in meta
                    if 'title' not in data and item.title:
                        data['title'] = item.title

                    # Optional Date Formatting
                    if format_date and 'date' in data and data['date']:
                        try:
                            date_obj = data['date']
                            if isinstance(date_obj, str):
                                date_obj = datetime.strptime(date_obj, '%Y-%m-%d').date()
                            
                            month_name = pt_months.get(date_obj.month, '')
                            data['date_formatted'] = f"{month_name} de {date_obj.year}"
                        except Exception:
                            data['date_formatted'] = str(data['date'])
                    
                    context[name].append(data)

        # Sort functionality
        for col_conf in collections_config:
            name = col_conf['name']
            format_date = col_conf.get('format_date', False)
            items = context.get(name, [])

            if format_date:
                # Sort by order, then by date (like old publications logic)
                def get_sort_key(pub):
                    date_val = pub.get('date', '')
                    if hasattr(date_val, 'isoformat'):
                        date_val = date_val.isoformat()
                    return (pub.get('order', 999), str(date_val))
                items.sort(key=get_sort_key)
            else:
                # Default sort by order
                items.sort(key=lambda x: x.get('order', 999))
            
            print(f"DEBUG: Found {len(items)} items for collection '{name}'")
            context[name] = items

        return context
