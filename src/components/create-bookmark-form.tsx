import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Center, Divider, HStack, Image, VStack } from "@chakra-ui/react";
import { useBookmarkStore } from "../stores/use-bookmark-store";
import { BookmarkElement } from "../models/bookmark";

type Inputs = {
  faviconUrl: string;
  group: string;
  subGroup: string;
  title: string;
  url: string;
};

interface CreateBookmarkFormProps {
  data?: {
    bookmarkElement: BookmarkElement;
    group?: string;
    subGroup?: string;
  };
}

export const CreateBookmarkForm: React.FC<CreateBookmarkFormProps> = ({
  data,
}) => {
  const addBookmark = useBookmarkStore((state) => state.addBookMark);
  const deleteBookmark = useBookmarkStore((state) => state.deleteBookmark);

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      faviconUrl: data?.bookmarkElement.faviconUrl,
      title: data?.bookmarkElement.faviconUrl,
      url: data?.bookmarkElement.url,
      group: data?.group,
      subGroup: data?.subGroup,
    },
  });

  const urlWatch = watch("url");
  const faviconUrlWatch = watch("faviconUrl");

  useEffect(() => {
    async function setFieldValues() {
      const url = getValues("url");
      setValue("faviconUrl", await getFavicon(url));
      setValue("title", await getTitleFromURL(url).then((data) => data));
    }
    setFieldValues();
  }, [getValues, setValue, urlWatch]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data?.bookmarkElement.id) {
          deleteBookmark(data.bookmarkElement.id);
        }
        addBookmark(
          {
            id: data?.bookmarkElement.id,
            faviconUrl: formData.faviconUrl,
            label: formData.title,
            url: formData.url,
          } as BookmarkElement,
          formData.group,
          formData.subGroup
        );
        resolve(data);
      }, 3000);
    });
  };

  const getFavicon = async (url: string): Promise<string> => {
    const fileTypes = ["ico", "png", "gif", "jpeg", "svg"];

    for (const fileType of fileTypes) {
      try {
        const faviconUrl = new URL(url);
        const returnUrl = await fetch(
          `https://pure-plains-13694.herokuapp.com/${faviconUrl.origin}/favicon.${fileType}`
        )
          .then((data) => {
            console.log(data);
            if (data.ok) {
              return data.text();
            } else {
              throw new Error("");
            }
          })
          .then(() => {
            return `${faviconUrl.origin}/favicon.${fileType}`;
          })
          .catch(
            () =>
              `https://www.google.com/s2/favicons?domain=${faviconUrl.hostname.replace(
                "www.",
                ""
              )}`
          );

        return returnUrl;
      } catch (err) {
        console.log(err);
      }
    }
    return "";
  };

  const getTitleFromURL = (url: string) =>
    fetch(`https://pure-plains-13694.herokuapp.com/${url}`)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll("title")[0];
        return title?.innerText;
      });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <VStack>
          <FormControl isInvalid={!!errors.url}>
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
              id="url"
              placeholder="url"
              {...register("url", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.url && errors.url.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Divider />
        <VStack>
          <FormControl isInvalid={!!errors.faviconUrl}>
            <FormLabel htmlFor="faviconUrl">Favicon URL</FormLabel>
            <HStack>
              <Image
                src={faviconUrlWatch}
                width="32px"
                height="32px"
                fallbackSrc="favicon.ico"
              />
              <Input
                id="faviconUrl"
                placeholder="favicon url"
                {...register("faviconUrl", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
            </HStack>
            <FormErrorMessage>
              {errors.faviconUrl && errors.faviconUrl.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              placeholder="title"
              {...register("title", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.url && errors.url.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Divider />
        <VStack>
          <FormControl isInvalid={!!errors.group}>
            <FormLabel htmlFor="group">Group</FormLabel>
            <Input
              id="group"
              placeholder="group"
              {...register("group", {
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.group && errors.group.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.subGroup}>
            <FormLabel htmlFor="subGroup">Sub Group</FormLabel>
            <Input
              id="subGroup"
              placeholder="subGroup"
              {...register("subGroup", {
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.subGroup && errors.subGroup.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Center>
          <Button
            my={4}
            width="100%"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            {data ? "Update" : "Create"}
          </Button>
        </Center>
      </VStack>
    </form>
  );
};
