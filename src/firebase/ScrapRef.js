// Gets all images in a specific folder
    // async function pageTokenExample() {
    //   // Create a reference under which you want to list
    //   const storage = getStorage();
    //   console.log("here");
    //   const listRef = ref(storage, 'images');

    //   // Fetch the first page of 100.
    //   const firstPage = await list(listRef, { maxResults: 100 });
    //   console.log(firstPage);
    //   console.log(firstPage.prefixes[0]._location.path_);
    //   // Use the result.
    //   // processItems(firstPage.items)
    //   // processPrefixes(firstPage.prefixes)

    //   // Fetch the second page if there are more elements.
    //   if (firstPage.nextPageToken) {
    //     const secondPage = await list(listRef, {
    //       maxResults: 100,
    //       pageToken: firstPage.nextPageToken,
    //     });
    //     // processItems(secondPage.items)
    //     // processPrefixes(secondPage.prefixes)
    //   }
    // }