from setuptools import setup, find_packages

setup(
    name='mkdocs-publications-plugin',
    version='0.1.0',
    packages=find_packages(),
    entry_points={
        'mkdocs.plugins': [
            'publications = publications.plugin:PublicationsPlugin',
        ]
    }
)
