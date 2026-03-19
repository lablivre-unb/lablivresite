from mkdocs.plugins import BasePlugin
from datetime import datetime
import locale

class PublicationsPlugin(BasePlugin):
    def on_page_context(self, context, page, config, nav):
        # Define Portuguese month names mapping
        pt_months = {
            1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril',
            5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto',
            9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
        }

        publications = []
        projects = []
        capacitacao = []
        treinamentos = []
        
        for item in nav.pages:
            if 'publications/' in item.url:
                pub_data = item.meta.copy() if item.meta else {}
                pub_data['url'] = item.url
                
                # Format date if present
                if 'date' in pub_data and pub_data['date']:
                    try:
                        date_obj = pub_data['date']
                        if isinstance(date_obj, str):
                            date_obj = datetime.strptime(date_obj, '%Y-%m-%d').date()
                        
                        month_name = pt_months.get(date_obj.month, '')
                        pub_data['date_formatted'] = f"{month_name} de {date_obj.year}"
                    except Exception:
                        pub_data['date_formatted'] = str(pub_data['date'])
                
                publications.append(pub_data)

            # Projetos de pesquisa (somente docs/projects/, NUNCA inclui gsoc-projects/)
            elif 'projects/' in item.url and 'gsoc-projects/' not in item.url:
                proj_data = item.meta.copy() if item.meta else {}
                proj_data['url'] = item.url
                
                projects.append(proj_data)
            
            elif 'capacitacao/' in item.url:
                cap_data = item.meta.copy() if item.meta else {}
                cap_data['url'] = item.url
                capacitacao.append(cap_data)
            
            elif 'treinamentos/' in item.url:
                tr_data = item.meta.copy() if item.meta else {}
                tr_data['url'] = item.url
                if 'title' not in tr_data and item.title:
                    tr_data['title'] = item.title
                
                treinamentos.append(tr_data)
        
        # Debug prints
        print(f"DEBUG: Found {len(publications)} publications")
        print(f"DEBUG: Found {len(projects)} projects")
        print(f"DEBUG: Found {len(capacitacao)} capacitacao items")
        print(f"DEBUG: Found {len(treinamentos)} treinamentos items")
        print(f"DEBUG: Treinamentos URLs: {[t.get('url') for t in treinamentos]}")

        # Sort publications
        def get_sort_key(pub):
            date_val = pub.get('date', '')
            # If date_val is a date object, convert to ISO string for comparison
            if hasattr(date_val, 'isoformat'):
                date_val = date_val.isoformat()
            return (pub.get('order', 999), str(date_val))

        publications.sort(key=get_sort_key, reverse=False)
        
        # Sort projects
        projects.sort(key=lambda x: x.get('order', 999))
        
        # Sort capacitacao
        capacitacao.sort(key=lambda x: x.get('order', 999))
        
        # Sort treinamentos
        treinamentos.sort(key=lambda x: x.get('order', 999))

        context['publications'] = publications
        context['projects'] = projects
        context['capacitacao'] = capacitacao
        context['treinamentos'] = treinamentos
        return context
