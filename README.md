# sb3-storage

Turbowarp extension to store and read files inside an sb3 file. Files can contain binary content, although I don't know how other blocks would handle it. Filenames can contain

The 'read file () from () to ()' block uses zero-indexed python string slicing, 'read file (x) from (-2) to (-1)' reads the second to last character of a file.

Files are stored as '{md5 hash of name}.png' within the sb3 file.

If you want to add a large amount of data to a project but can't copy/paste it into the editor, you can:
* Create the files from within the project, but don't add any data
* Download and extract the sb3 file
* Add the data with a text editor like notepad++. Any files you add here won't show up in the project, you can only modify existing files
* Zip all the files again and load it in the editor


## Known issues

* Each file takes a few seconds to load no matter how big it is
* Files are stored in-memory once the project loads. This will probably change soon.
* 'read file () from () to ()' breaks when trying to access the last character with negative index values.
