from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='client_support',
    version=version,
    description='client_support',
    author='Makarand Bauskar',
    author_email='makarand.b@indictranstech.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
